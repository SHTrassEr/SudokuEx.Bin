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
                this.maxValue = dimension * dimension;
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

            SudokuCell.prototype.getValue = function () {
                if (this.input.value) {
                    var c = this.input.value.charCodeAt(0);
                    return SudokuEx.Base.SudokuUtils.getValueFromChar(c);
                } else {
                    return 0;
                }
            };

            SudokuCell.prototype.createInputElement = function () {
                var _this = this;
                var input = document.createElement("input");
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
                element.setAttribute("class", this.emptyClass);
                element.appendChild(input);
                return element;
            };

            SudokuCell.prototype.onCellFocus = function () {
                this.element.setAttribute("class", this.activeClass);
            };

            SudokuCell.prototype.onCellBlur = function () {
                if (this.getValue() == 0) {
                    this.element.setAttribute("class", this.emptyClass);
                } else {
                    this.element.setAttribute("class", this.filledClass);
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
                this.activeClass = "active";
                this.filledClass = "filled";
                this.emptyClass = "empty";
                this.checkDimension(dimension);
                this.fieldElement = this.createFieldElement(dimension);
                var maxValue = dimension * dimension;
                var cellsCount = maxValue * maxValue;

                for (var i = 0; i < cellsCount; i++) {
                    var cell = new GUI.SudokuCell(dimension, i);
                    this.fieldElement.appendChild(cell.getCellElement());
                }

                container.appendChild(this.fieldElement);
            }
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
                fieldElement.className = "d" + dimension;
                return fieldElement;
            };
            return SudokuControl;
        })();
        GUI.SudokuControl = SudokuControl;
    })(SudokuEx.GUI || (SudokuEx.GUI = {}));
    var GUI = SudokuEx.GUI;
})(SudokuEx || (SudokuEx = {}));
//# sourceMappingURL=sudokuEx.gui.js.map
