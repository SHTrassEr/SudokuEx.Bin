/// <reference path="../../SudokuEx.Bin/DefinitelyTyped/underscore/underscore.d.ts" />
declare module SudokuEx.Base {
    class SudokuUtils {
        private static zeroChar;
        private static aChar;
        private static inputFilter;
        static getCellIndex(rowIndex: number, colIndex: number, maxValue: number): number;
        static tryAddUniqValue(array: number[], value: number): boolean;
        static getDimenensionByMaxValue(maxValue: number): number;
        static getMaxValueByCellsCount(cellsCount: number): number;
        static parse(s: string): number[];
        static getCharFromValue(c: number): number;
        static getValueFromChar(c: number): number;
    }
}
declare module SudokuEx.Base {
    class BlockListInfo {
        private static MaxDimension;
        private static Instances;
        private blockCount;
        private blockList;
        private blockListHash;
        constructor(dimension: number);
        public getBlockCount(): number;
        public getBlockList(): number[][];
        public getBlockListByCellID(cellID: number): number[][];
        static getInstance(dimension: number): BlockListInfo;
    }
}
interface ISudokuField {
    setField(field: number[]): void;
    getDimension(): number;
    getMaxValue(): number;
    getCellsCount(): number;
    check(): boolean;
    setCell(rowIndex: number, colIndex: number, value: number): void;
    getCell(rowIndex: number, colIndex: number): number;
    getCellById(cellID: number): number;
    getField(): number[];
    copy(): ISudokuField;
}
interface ISudokuGenerator {
    generate(): number[][];
}
interface ISudokuSolver {
    findSolution(): boolean;
    findAllSolutions(maxSolutionsCount: number): boolean;
    getSolution(): number[];
    getAllSolutions(): number[][];
    getSolutionsCount(): number;
}
declare module SudokuEx.Base {
    class SudokuField implements ISudokuField {
        private notFilledCellsCount;
        private cellsCount;
        private maxValue;
        private dimension;
        private blockListInfo;
        private field;
        public setField(field: number[]): void;
        public getDimension(): number;
        public getMaxValue(): number;
        public getCellsCount(): number;
        public check(): boolean;
        public setCell(rowIndex: number, colIndex: number, value: number): void;
        public setCellByID(cellID: number, value: number): void;
        public getCell(rowIndex: number, colIndex: number): number;
        public getCellById(cellID: number): number;
        public getField(): number[];
        private checkBlocks();
        private checkCellValue(value);
        public copy(): SudokuField;
    }
}
declare module SudokuEx.Base {
    class SudokuIndexUtils {
        static getColIndex(maxValue: number, index: number): number;
        static getRowIndex(maxValue: number, index: number): number;
    }
}
declare module SudokuEx.Base {
    class SudokuSolver implements ISudokuSolver {
        private history;
        private currentSudokuSolver;
        private solutionList;
        private maxSolutionsCount;
        constructor(field: number[]);
        public findSolution(): boolean;
        public findAllSolutions(maxSolutionsCount?: number): boolean;
        public getSolution(): number[];
        public getSolutionsCount(): number;
        public getAllSolutions(): number[][];
        private trySolve();
        private iterate(goDeeper?);
        private processCell(cellID, goDeeper);
        private tryValues(cellID, values);
    }
}
