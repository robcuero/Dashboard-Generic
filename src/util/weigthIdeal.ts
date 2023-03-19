export function calculateIdealBodyWeight(height: number, currentWeight: number): number {
console.log(Math.round((currentWeight/100)/(height*height)))
    return Math.round(2/(Number(height)*Number(height)));
    
  }