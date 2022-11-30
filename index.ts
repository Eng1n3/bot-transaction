import { JsonDB, Config } from 'node-json-db';
import fs from "fs"
import path from "path"


class GenerateDate {
  public static getDate() {
    let date_ob = new Date();

    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = date_ob.getHours();

    // current minutes
    let minutes = date_ob.getMinutes();

    // current seconds
    let seconds = date_ob.getSeconds();

    // prints date in YYYY-MM-DD format
    const dateNow = year + "-" + month + "-" + date;

    // prints date & time in YYYY-MM-DD HH:MM:SS format
    //console.log(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);

    // prints time in HH:MM format
    //console.log(hours + ":" + minutes);
    return dateNow
  }
}

class GenerateJson extends GenerateDate{
  private _dirName: string;
  private _fileName: string;
  public static instance: any

  constructor(dirName: string, fileName: string) {
    super()
    this._dirName = dirName;
    this._fileName = fileName;
  }



  generateJson() {
    const dirname = path.join(__dirname, this._dirName)
    const dirFileName = `./${this._dirName}/${this._fileName}.json`
    if (!fs.existsSync(`${this._dirName}`)) {
      fs.mkdirSync(this._dirName);
    }
    const checkFileName = fs.readdirSync(`./${this._dirName}`)

    if (!checkFileName.length) fs.writeFileSync(dirFileName, "{}", "utf8");
    checkFileName.forEach(filename => {
      if (!GenerateJson.instance && filename !== this._fileName)
	
	GenerateJson.instance = new JsonDB(new Config(this._dirName, true, false, '/'));
    });
    return GenerateJson.instance
  }
}

interface FooBar {
    Hello: string
    World: number
}
const object = {Hello: "World", World: 5} as FooBar;

const test = async (): Promise<any | unknown> => {
  try {
    const fileName = GenerateDate.getDate()
    const db = new GenerateJson("databases", fileName).generateJson()
    /**
      await db.push("/orderHistory[]", {
        id: 33400,
        nama: "Gilang sentosa",
        newBuy: 2
      }, true)
    */
    await db.push("/date", Date())
    const result = await db.getObject("/date");
    return result;
  } catch(error: unknown) {
    throw error
  }
}


test().then(res => console.log(res)).catch(err => err)
