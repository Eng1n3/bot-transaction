"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_json_db_1 = require("node-json-db");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class GenerateDate {
    static getDate() {
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
        return dateNow;
    }
}
class GenerateJson extends GenerateDate {
    constructor(dirName, fileName) {
        super();
        this._dirName = dirName;
        this._fileName = fileName;
    }
    generateJson() {
        const dirname = path_1.default.join(__dirname, this._dirName);
        const dirFileName = `./${this._dirName}/${this._fileName}.json`;
        if (!fs_1.default.existsSync(`${this._dirName}`)) {
            fs_1.default.mkdirSync(this._dirName);
        }
        const checkFileName = fs_1.default.readdirSync(`./${this._dirName}`);
        if (!checkFileName.length)
            fs_1.default.writeFileSync(dirFileName, "{}", "utf8");
        checkFileName.forEach(filename => {
            if (!GenerateJson.instance && filename !== this._fileName)
                GenerateJson.instance = new node_json_db_1.JsonDB(new node_json_db_1.Config(this._dirName, true, false, '/'));
        });
        return GenerateJson.instance;
    }
}
const object = { Hello: "World", World: 5 };
const test = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileName = GenerateDate.getDate();
        const db = new GenerateJson("databases", fileName).generateJson();
        /**
          await db.push("/orderHistory[]", {
            id: 33400,
            nama: "Gilang sentosa",
            newBuy: 2
          }, true)
        */
        yield db.push("/date", Date());
        const result = yield db.getObject("/date");
        return result;
    }
    catch (error) {
        throw error;
    }
});
test().then(res => console.log(res)).catch(err => err);
