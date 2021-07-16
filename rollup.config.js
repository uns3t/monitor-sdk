import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";

export default {
    input:["src/index.ts"],
    output:{
        file:'dist/monitorsdk.js',
        format:'umd',
        name:'monitorsdk'
    },
    plugins: [
        babel({
            exclude:'node_moudles/**'
        }),
        typescript(),
        commonjs({ extensions: [".js", ".ts"] }),
        resolve({
            jsnext: true,
            main: true,
            browser: true
        }),
    ]
};