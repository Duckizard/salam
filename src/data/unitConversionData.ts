// Unit conversion logic
export const unitConversions = {
  length: {
    meters: {
      to: {
        feet: (m: number) => m * 3.28084,
        inches: (m: number) => m * 39.3701,
        centimeters: (m: number) => m * 100,
        kilometers: (m: number) => m / 1000,
        miles: (m: number) => m / 1609.34,
      },
      from: {
        feet: (ft: number) => ft / 3.28084,
        inches: (inch: number) => inch / 39.3701,
        centimeters: (cm: number) => cm / 100,
        kilometers: (km: number) => km * 1000,
        miles: (mi: number) => mi * 1609.34,
      }
    },
    feet: {
      to: {
        meters: (ft: number) => ft / 3.28084,
        inches: (ft: number) => ft * 12,
      },
      from: {
        meters: (m: number) => m * 3.28084,
        inches: (inch: number) => inch / 12,
      }
    },
    inches: {
      to: {
        meters: (inch: number) => inch / 39.3701,
        feet: (inch: number) => inch / 12,
      },
      from: {
        meters: (m: number) => m * 39.3701,
        feet: (ft: number) => ft * 12,
      }
    },
    centimeters: {
      to: {
        meters: (cm: number) => cm / 100,
        inches: (cm: number) => cm / 2.54,
      },
      from: {
        meters: (m: number) => m * 100,
        inches: (inch: number) => inch * 2.54,
      }
    },
    kilometers: {
      to: {
        meters: (km: number) => km * 1000,
        miles: (km: number) => km / 1.60934,
      },
      from: {
        meters: (m: number) => m / 1000,
        miles: (mi: number) => mi * 1.60934,
      }
    },
    miles: {
      to: {
        meters: (mi: number) => mi * 1609.34,
        kilometers: (mi: number) => mi * 1.60934,
      },
      from: {
        meters: (m: number) => m / 1609.34,
        kilometers: (km: number) => km / 1.60934,
      }
    }
  },
  weight: {
    kilograms: {
      to: {
        pounds: (kg: number) => kg * 2.20462,
        grams: (kg: number) => kg * 1000,
        ounces: (kg: number) => kg * 35.274,
      },
      from: {
        pounds: (lb: number) => lb / 2.20462,
        grams: (g: number) => g / 1000,
        ounces: (oz: number) => oz / 35.274,
      }
    },
    pounds: {
      to: {
        kilograms: (lb: number) => lb / 2.20462,
        ounces: (lb: number) => lb * 16,
      },
      from: {
        kilograms: (kg: number) => kg * 2.20462,
        ounces: (oz: number) => oz / 16,
      }
    },
    grams: {
      to: {
        kilograms: (g: number) => g / 1000,
        ounces: (g: number) => g / 28.3495,
      },
      from: {
        kilograms: (kg: number) => kg * 1000,
        ounces: (oz: number) => oz * 28.3495,
      }
    },
    ounces: {
      to: {
        kilograms: (oz: number) => oz / 35.274,
        pounds: (oz: number) => oz / 16,
        grams: (oz: number) => oz * 28.3495,
      },
      from: {
        kilograms: (kg: number) => kg * 35.274,
        pounds: (lb: number) => lb * 16,
        grams: (g: number) => g * 28.3495,
      }
    }
  },
  temperature: {
    celsius: {
      to: {
        fahrenheit: (c: number) => (c * 9/5) + 32,
        kelvin: (c: number) => c + 273.15,
      },
      from: {
        fahrenheit: (f: number) => (f - 32) * 5/9,
        kelvin: (k: number) => k - 273.15,
      }
    },
    fahrenheit: {
      to: {
        celsius: (f: number) => (f - 32) * 5/9,
        kelvin: (f: number) => ((f - 32) * 5/9) + 273.15,
      },
      from: {
        celsius: (c: number) => (c * 9/5) + 32,
        kelvin: (k: number) => (k - 273.15) * 9/5 + 32,
      }
    },
    kelvin: {
      to: {
        celsius: (k: number) => k - 273.15,
        fahrenheit: (k: number) => (k - 273.15) * 9/5 + 32,
      },
      from: {
        celsius: (c: number) => c + 273.15,
        fahrenheit: (f: number) => ((f - 32) * 5/9) + 273.15,
      }
    }
  }
};