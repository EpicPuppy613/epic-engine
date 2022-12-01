import { SemVer } from "./semver";

type Dependency = {
    id: string,
    version: SemVer;
};

export class Mod {
    id: string;
    name: string;
    version: SemVer;
    dependencies: Dependency[];

    constructor (id: string, name: string, version: SemVer, dependencies: Dependency[]) {
        this.id = id;
        this.name = name;
        this.version = version;
        this.dependencies = dependencies;
    }

    checkDependencies (mods: Mod[]) {
        if (this.dependencies.length === 0) return true;
        for (const dependency of this.dependencies) {
            let satisfied = false;
            for (const mod of mods) {
                if (mod.id === dependency.id && dependency.version.gte(mod.version)) satisfied = true;
            }
            if (!satisfied) return false;
        }
        return true;
    }
};