var SudokuEx;
(function (SudokuEx) {
    (function (GUI) {
        var SudokuCell = (function () {
            function SudokuCell(dimension, index) {
                this.dimension = dimension;
                this.index = index;
                this.activeClass = "active";
                this.filledClass = "filled";
                this.emptyClass = "empty";
                this.borderTopClass = "bt";
                this.borderRightClass = "br";
                this.borderBottomClass = "bb";
                this.borderLeftClass = "bl";
                this.borderClass = "";
                this.maxValue = dimension * dimension;
                this.colIndex = SudokuEx.Base.SudokuIndexUtils.getColIndex(this.maxValue, index);
                this.rowIndex = SudokuEx.Base.SudokuIndexUtils.getRowIndex(this.maxValue, index);
                this.borderClass = this.getBorderClass();
                this.input = this.createInputElement();
                this.element = this.createElement(this.input);
            }
            SudokuCell.prototype.getCellElement = function () {
                return this.element;
            };

            SudokuCell.prototype.setValue = function (value) {
                var c = SudokuEx.Base.SudokuUtils.getCharFromValue(value);
                this.input.value = String.fromCharCode(c);
            };

            SudokuCell.prototype.getValueString = function () {
                if (this.input.value) {
                    return this.input.value;
                }

                return "0";
            };

            SudokuCell.prototype.getValue = function () {
                if (this.input.value) {
                    var c = this.input.value.charCodeAt(0);
                    return SudokuEx.Base.SudokuUtils.getValueFromChar(c);
                } else {
                    return 0;
                }
            };

            SudokuCell.prototype.getBorderClass = function () {
                return this.getBorderRightClass() + this.getBorderLeftClass() + this.getBorderBottomClass() + this.getBorderTopClass();
            };

            SudokuCell.prototype.getBorderRightClass = function () {
                if (((this.colIndex + 1) % this.maxValue != 0) && ((this.colIndex + 1) % this.dimension == 0)) {
                    return " " + this.borderRightClass;
                }

                return "";
            };

            SudokuCell.prototype.getBorderLeftClass = function () {
                if ((this.colIndex % this.maxValue != 0) && (this.colIndex % this.dimension == 0)) {
                    return " " + this.borderLeftClass;
                }

                return "";
            };

            SudokuCell.prototype.getBorderBottomClass = function () {
                if (((this.rowIndex + 1) % this.maxValue != 0) && ((this.rowIndex + 1) % this.dimension == 0)) {
                    return " " + this.borderBottomClass;
                }

                return "";
            };

            SudokuCell.prototype.getBorderTopClass = function () {
                if ((this.rowIndex % this.maxValue != 0) && (this.rowIndex % this.dimension == 0)) {
                    return " " + this.borderTopClass;
                }

                return "";
            };

            SudokuCell.prototype.createInputElement = function () {
                var _this = this;
                var input = document.createElement("input");
                input.setAttribute("maxlength", "1");
                input.onfocus = function (ev) {
                    _this.onCellFocus();
                };
                input.onblur = function (ev) {
                    _this.onCellBlur();
                };
                return input;
            };

            SudokuCell.prototype.createElement = function (input) {
                var element = document.createElement("li");
                element.setAttribute("class", this.emptyClass + this.borderClass);
                element.appendChild(input);
                return element;
            };

            SudokuCell.prototype.onCellFocus = function () {
                this.element.setAttribute("class", this.activeClass + this.borderClass);
            };

            SudokuCell.prototype.onCellBlur = function () {
                if (this.getValue() == 0) {
                    this.element.setAttribute("class", this.emptyClass + this.borderClass);
                } else {
                    this.element.setAttribute("class", this.filledClass + this.borderClass);
                }
            };
            return SudokuCell;
        })();
        GUI.SudokuCell = SudokuCell;
    })(SudokuEx.GUI || (SudokuEx.GUI = {}));
    var GUI = SudokuEx.GUI;
})(SudokuEx || (SudokuEx = {}));
var SudokuEx;
(function (SudokuEx) {
    (function (GUI) {
        var SudokuControl = (function () {
            function SudokuControl(dimension, container) {
                this.dimension = dimension;
                this.container = container;
                this.sudokuFieldClass = "sudokuField";
                this.dimensionClass = "dimension";
                this.checkDimension(dimension);
                this.fieldElement = this.createFieldElement(dimension);
                var maxValue = dimension * dimension;
                this.cellsCount = maxValue * maxValue;
                this.cells = new Array(this.cellsCount);

                for (var i = 0; i < this.cellsCount; i++) {
                    var cell = new GUI.SudokuCell(dimension, i);
                    this.cells[i] = cell;
                    this.fieldElement.appendChild(cell.getCellElement());
                }

                container.appendChild(this.fieldElement);
            }
            SudokuControl.prototype.fieldToString = function () {
                var s = "";
                for (var i = 0; i < this.cellsCount; i++) {
                    s += this.cells[i].getValueString();
                }

                return s;
            };

            SudokuControl.prototype.checkDimension = function (dimension) {
                if (dimension < 2) {
                    throw "Dimension must be greater then 1";
                }

                if (dimension > 5) {
                    throw "Dimension must be less then 6";
                }
            };

            SudokuControl.prototype.createFieldElement = function (dimension) {
                var fieldElement = document.createElement("ul");
                fieldElement.className = this.sudokuFieldClass + " " + this.dimensionClass + dimension;
                return fieldElement;
            };
            return SudokuControl;
        })();
        GUI.SudokuControl = SudokuControl;
    })(SudokuEx.GUI || (SudokuEx.GUI = {}));
    var GUI = SudokuEx.GUI;
})(SudokuEx || (SudokuEx = {}));
//# sourceMappingURL=sudokuEx.gui.js.map
