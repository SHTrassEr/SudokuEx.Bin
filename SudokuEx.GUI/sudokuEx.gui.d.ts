/// <reference path="../../SudokuEx.Bin/SudokuEx.Base/sudokuEx.base.d.ts" />
interface ISudokuCell {
    setValue(value: number): void;
    getValue(): number;
    getValueString(): string;
    getCellElement(): HTMLElement;
}
interface ISudokuControl {
}
declare module SudokuEx.GUI {
    class SudokuCell implements ISudokuCell {
        private dimension;
        private index;
        private activeClass;
        private filledClass;
        private emptyClass;
        private borderTopClass;
        private borderRightClass;
        private borderBottomClass;
        private borderLeftClass;
        private borderClass;
        private input;
        private element;
        private colIndex;
        private rowIndex;
        private maxValue;
        constructor(dimension: number, index: number);
        public getCellElement(): HTMLElement;
        public setValue(value: number): void;
        public getValueString(): string;
        public getValue(): number;
        private getBorderClass();
        private getBorderRightClass();
        private getBorderLeftClass();
        private getBorderBottomClass();
        private getBorderTopClass();
        private createInputElement();
        private createElement(input);
        private onCellFocus();
        private onCellBlur();
    }
}
declare module SudokuEx.GUI {
    class SudokuControl implements ISudokuControl {
        private dimension;
        private container;
        private fieldElement;
        private cells;
        private cellsCount;
        private sudokuFieldClass;
        private dimensionClass;
        constructor(dimension: number, container: HTMLElement);
        public fieldToString(): string;
        private checkDimension(dimension);
        private createFieldElement(dimension);
    }
}
