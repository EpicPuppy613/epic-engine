class SemVer {
    major: number;
    minor: number;
    patch: number;
    pre: string | null;

    constructor (major: number, minor: number, patch: number, pre?: string | undefined) {
        this.major = major;
        this.minor = minor;
        this.patch = patch;
        this.pre = pre !== undefined ? pre : null;
    }

    toString (): string {
        let out = `${this.major}.${this.minor}.${this.patch}`;
        out += this.pre !== null ? `-${this.pre}` : "";
        return out;
    }

    fromString (str: string): SemVer {
        if (!/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/
        .test(str)) throw new EvalError("String is not a valid SemVer");
        const split = str.split('-');
        const pre = split.slice(1);
        const verstring = split[0];
        const version = verstring.split('.');
        let prestring;
        if (pre.length > 0) {
            prestring = pre.reduce((a, b) => a + b);
        }
        return new SemVer(parseInt(version[0], 10), parseInt(version[1], 10), parseInt(version[2], 10), prestring);
    }

    gte (compare: SemVer): boolean {
        if (this.major > compare.major) return true;
        if (this.major < compare.major) return false;
        if (this.minor > compare.minor) return true;
        if (this.minor < compare.minor) return false;
        if (this.patch > compare.patch) return true;
        if (this.patch < compare.patch) return false;
        if (this.pre === null && compare.pre !== null) return true;
        if (this.pre !== null && compare.pre === null) return false;
        if (compare.pre !== null && this.pre !== null && this.pre >= compare.pre) return true;
        return false;
    }

    lt (compare: SemVer): boolean {
        return !this.gte(compare);
    }
};