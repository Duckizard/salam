/*
  # Create Crypto Trading Tables

  1. New Tables
    - `portfolios`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `balance` (numeric)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `positions`
      - `id` (uuid, primary key)
      - `portfolio_id` (uuid, references portfolios)
      - `symbol` (text)
      - `amount` (numeric)
      - `average_price` (numeric)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `transactions`
      - `id` (uuid, primary key)
      - `portfolio_id` (uuid, references portfolios)
      - `symbol` (text)
      - `type` (text, buy/sell)
      - `amount` (numeric)
      - `price` (numeric)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create portfolios table
CREATE TABLE IF NOT EXISTS portfolios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  balance numeric NOT NULL DEFAULT 10000,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT balance_positive CHECK (balance >= 0)
);

-- Create positions table
CREATE TABLE IF NOT EXISTS positions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id uuid REFERENCES portfolios ON DELETE CASCADE NOT NULL,
  symbol text NOT NULL,
  amount numeric NOT NULL DEFAULT 0,
  average_price numeric NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT amount_positive CHECK (amount >= 0),
  CONSTRAINT average_price_positive CHECK (average_price > 0),
  UNIQUE (portfolio_id, symbol)
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id uuid REFERENCES portfolios ON DELETE CASCADE NOT NULL,
  symbol text NOT NULL,
  type text NOT NULL CHECK (type IN ('buy', 'sell')),
  amount numeric NOT NULL,
  price numeric NOT NULL,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT amount_positive CHECK (amount > 0),
  CONSTRAINT price_positive CHECK (price > 0)
);

-- Enable RLS
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own portfolio"
  ON portfolios
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own portfolio"
  ON portfolios
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own positions"
  ON positions
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM portfolios
      WHERE portfolios.id = positions.portfolio_id
      AND portfolios.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own positions"
  ON positions
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM portfolios
      WHERE portfolios.id = positions.portfolio_id
      AND portfolios.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view own transactions"
  ON transactions
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM portfolios
      WHERE portfolios.id = transactions.portfolio_id
      AND portfolios.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own transactions"
  ON transactions
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM portfolios
      WHERE portfolios.id = transactions.portfolio_id
      AND portfolios.user_id = auth.uid()
    )
  );

-- Create function to update position on transaction
CREATE OR REPLACE FUNCTION update_position_on_transaction()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.type = 'buy' THEN
    INSERT INTO positions (portfolio_id, symbol, amount, average_price)
    VALUES (NEW.portfolio_id, NEW.symbol, NEW.amount, NEW.price)
    ON CONFLICT (portfolio_id, symbol) DO UPDATE
    SET amount = positions.amount + NEW.amount,
        average_price = (positions.amount * positions.average_price + NEW.amount * NEW.price) / (positions.amount + NEW.amount),
        updated_at = now();
  ELSE
    UPDATE positions
    SET amount = amount - NEW.amount,
        updated_at = now()
    WHERE portfolio_id = NEW.portfolio_id AND symbol = NEW.symbol;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for position updates
CREATE TRIGGER update_position_trigger
AFTER INSERT ON transactions
FOR EACH ROW
EXECUTE FUNCTION update_position_on_transaction();

-- Create function to update portfolio balance on transaction
CREATE OR REPLACE FUNCTION update_portfolio_balance_on_transaction()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.type = 'buy' THEN
    UPDATE portfolios
    SET balance = balance - (NEW.amount * NEW.price),
        updated_at = now()
    WHERE id = NEW.portfolio_id;
  ELSE
    UPDATE portfolios
    SET balance = balance + (NEW.amount * NEW.price),
        updated_at = now()
    WHERE id = NEW.portfolio_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for balance updates
CREATE TRIGGER update_balance_trigger
AFTER INSERT ON transactions
FOR EACH ROW
EXECUTE FUNCTION update_portfolio_balance_on_transaction();