import * as fs from "fs";
import * as _path from "path";
import { spawnSync } from "child_process";

const cwd: string = process.cwd();
const root: string = _path.resolve(__dirname, "..");
const assetsPath: string = _path.resolve(root, "assets");
const tsconfgPath: string = _path.resolve(assetsPath, "tsconfig", "base.tsconfig.json");

// Load assets
const tsconfig: IObject = JSON.parse(fs.readFileSync(tsconfgPath, {encoding: "utf-8"}));

tsconfig["compilerOptions"]["target"] = "esnext";

console.log("Initializing npm package...\n>> npm init");
spawnSync("npm init", {cwd, shell: true, stdio: "inherit"});

console.log("Installing dependencies...\n>> npm install -D typescript tslint @types/node");
spawnSync("npm install -D typescript tslint @types/node", {cwd, shell: true, stdio: "inherit"});

console.log("Initializing tslint...\n>> npx tslint --init");
spawnSync("npx tslint --init", {cwd, shell: true, stdio: "inherit"});

console.log("Creating 'src' directory and index file...");
fs.mkdirSync(_path.resolve(cwd, "src"));
fs.writeFileSync(_path.resolve(cwd, "src", "index.ts"), "");

console.log("Writing to 'tsconfig.json'...");
fs.writeFileSync(_path.resolve(cwd, "tsconfig.json"), JSON.stringify(tsconfig, null, 4));