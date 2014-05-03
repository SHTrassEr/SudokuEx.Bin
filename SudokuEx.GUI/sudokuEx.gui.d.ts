/// <reference path="../../SudokuEx.Bin/SudokuEx.Base/sudokuEx.base.d.ts" />
interface ISudokuCell {
    setValue(value: number): void;
    getValue(): number;
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
        private input;
        private element;
        private maxValue;
        constructor(dimension: number, index: number);
        public getCellElement(): HTMLElement;
        public setValue(value: number): void;
        public getValue(): number;
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
        private activeClass;
        private filledClass;
        private emptyClass;
        constructor(dimension: number, container: HTMLElement);
        private checkDimension(dimension);
        private createFieldElement(dimension);
    }
}
