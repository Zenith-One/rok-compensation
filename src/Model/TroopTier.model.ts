export enum TroopType {
  SIEGE = 'Siege',
  ARCHER = 'Archer',
  CAVALRY = 'Cavalry',
  INFANTRY = 'Infantry'
};

export enum TroopTier { T1 = 1, T2 = 2, T3 = 3, T4 = 4, T5 = 5 };

export interface TroopCost {
  minutes: number,
  food: number,
  wood: number,
  stone: number,
  gold: number,
  timeFood: number,
  timeWood: number,
  timeStone: number,
  timeGold: number
}

export interface TroopTierData {
  name: string;
  cost: {
    heal: TroopCost,
    fresh: TroopCost
  }
}

interface TroopTypeEntry {
    [key: number] : TroopTierData //TroopTier
}

interface TroopTypeDictionary {
    [key: string]: TroopTypeEntry, //TroopType
    arr: TroopTierData[]
}

let data: TroopTypeDictionary = { arr: [

    {
        name: `Select Type...`,
        cost: {
            heal: {
                minutes: 0, food: 0, wood: 0, stone: 0, gold: 0,
                timeFood: 0, timeWood: 0, timeStone: 0, timeGold: 0
            },
            fresh: {
                minutes: 0, food: 0, wood: 0, stone: 0, gold: 0,
                timeFood: 0, timeWood: 0, timeStone: 0, timeGold: 0
            }
        }
    }
]};

function addItem (
        uType:string,
        tier:number,
        healFood:number,
        healWood:number,
        healStone:number,
        healGold:number,
        minutes:number,
        timeFood:number,
        timeWood:number,
        timeStone:number,
        timeGold:number,
        freshMinutes:number,
        freshFood:number,
        freshWood:number,
        freshStone:number,
        freshGold:number
    ): void{
    let newEntry: TroopTierData = {
        name: `${uType} T${tier}`,
        cost: {
            heal: {
                minutes: minutes,
                food: healFood,
                wood: healWood,
                stone: healStone,
                gold: healGold,
                timeFood: timeFood,
                timeWood: timeWood,
                timeStone: timeStone,
                timeGold: timeGold
            },
            fresh: {
                minutes: freshMinutes,
                food: healFood / 0.4,
                wood: healWood / 0.4,
                stone: healStone / 0.4,
                gold: healGold / 0.4,
                timeFood: freshFood,
                timeWood: freshWood,
                timeStone: freshStone,
                timeGold: freshGold
            }
        }
    }

    data[uType] = data[uType] || {};
    data[uType][tier] = newEntry;
    data.arr.push(newEntry);
}

addItem('Siege', 1,24,24,0,0,0,0,0,0,0,0.25,150,150,0,0);
addItem('Siege', 2,26,26,20,0,0.01666666667,6.666666667,6.666666667,5,0,0.5,300,300,225,0);
addItem('Siege', 3,40,40,30,4,0.03333333333,10,10,7.5,3.333333333,1,600,600,450,200);
addItem('Siege', 4,80,80,60,8,0.05,15,15,11.25,5,1.333333333,800,800,600,266.6666667);
addItem('Siege', 5,200,200,160,160,0.06666666667,20,20,15,6.666666667,2,1200,1200,900,400);
addItem('Archer', 1,16,24,0,0,0,0,0,0,0,0.25,150,150,0,0);
addItem('Archer', 2,0,40,30,0,0.01666666667,0,10,7.5,0,0.5,0,300,225,0);
addItem('Archer', 3,0,60,44,4,0.03333333333,0,13.33333333,10,4.444444444,1,0,600,450,200);
addItem('Archer', 4,0,120,90,8,0.05,0,20,15,6.666666667,1.333333333,0,800,600,266.6666667);
addItem('Archer', 5,0,320,240,160,0.06666666667,0,26.66666667,20,8.888888889,2,0,1200,900,400);
addItem('Cavalry', 1,24,16,0,0,0,0,0,0,0,0.25,150,150,0,0);
addItem('Cavalry', 2,40,0,30,0,0.01666666667,10,0,7.5,0,0.5,300,0,225,0);
addItem('Cavalry',3,60,0,40,4,0.03333333333,13.33333333,0,10,4.444444444,1,600,0,450,200);
addItem('Cavalry', 4,120,0,90,8,0.05,20,0,15,6.666666667,1.333333333,800,0,600,266.6666667);
addItem('Cavalry', 5,320,0,240,160,0.06666666667,26.66666667,0,20,8.888888889,2,1200,0,900,400);
addItem('Infantry', 1,20,20,0,0,0,0,0,0,0,0.25,150,150,0,0);
addItem('Infantry', 2,40,40,0,0,0.01666666667,10,10,0,0,0.5,300,300,0,0);
addItem('Infantry', 3,60,60,0,4,0.03333333333,13.33333333,13.33333333,0,4.444444444,1,600,600,0,200);
addItem('Infantry', 4,120,120,0,8,0.05,20,20,0,6.666666667,1.333333333,800,800,0,266.6666667);
addItem('Infantry', 5,320,320,0,160,0.06666666667,26.66666667,26.66666667,0,8.888888889,2,1200,1200,0,400);

export default data; 