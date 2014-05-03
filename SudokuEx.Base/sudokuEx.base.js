var SudokuEx;
(function (SudokuEx) {
    (function (Base) {
        var SudokuUtils = (function () {
            function SudokuUtils() {
            }
            SudokuUtils.getCellIndex = function (rowIndex, colIndex, maxValue) {
                return rowIndex * maxValue + colIndex;
            };

            SudokuUtils.tryAddUniqValue = function (array, value) {
                if (_.contains(array, value))
                    return false;
                array.push(value);
                return true;
            };

            SudokuUtils.getDimenensionByMaxValue = function (maxValue) {
                var dimension = Math.floor(Math.sqrt(maxValue));
                if (dimension * dimension != maxValue)
                    throw "Illegal maxValue";
                if (dimension < 2)
                    throw "dimension must be greater then 1";
                return dimension;
            };

            SudokuUtils.getMaxValueByCellsCount = function (cellsCount) {
                var maxValue = Math.floor(Math.sqrt(cellsCount));
                if (maxValue * maxValue != cellsCount)
                    throw "Illegal fieldLength";
                if (maxValue < 4)
                    throw "maxValue must be greater then 3";
                return maxValue;
            };

            SudokuUtils.parse = function (s) {
                if (!s)
                    throw "Illegal input";
                s = s.replace(SudokuUtils.inputFilter, "");
                var cellsCount = s.length;

                var maxValue = SudokuUtils.getMaxValueByCellsCount(cellsCount);
                var dimension = SudokuUtils.getDimenensionByMaxValue(maxValue);
                var field = new Array(cellsCount);
                s = s.toLowerCase();

                _.times(cellsCount, function (charIndex) {
                    var value = SudokuUtils.getValueFromChar(s.charCodeAt(charIndex));
                    field[charIndex] = value;
                });

                return field;
            };

            SudokuUtils.getCharFromValue = function (c) {
                if (c >= 0 && c <= 9)
                    return c + SudokuUtils.zeroChar;
                if (c >= 10 && c <= 35)
                    return c + SudokuUtils.aChar - 10;
                throw "invalid number: " + c;
            };

            SudokuUtils.getValueFromChar = function (c) {
                if (c >= SudokuUtils.zeroChar && c <= (SudokuUtils.zeroChar + 9))
                    return c - SudokuUtils.zeroChar;
                if (c >= SudokuUtils.aChar && c <= (SudokuUtils.aChar + 25))
                    return c - SudokuUtils.aChar + 10;
                throw "invalid char number: " + c;
            };
            SudokuUtils.zeroChar = "0".charCodeAt(0);
            SudokuUtils.aChar = "a".charCodeAt(0);
            SudokuUtils.inputFilter = /\s/g;
            return SudokuUtils;
        })();
        Base.SudokuUtils = SudokuUtils;
    })(SudokuEx.Base || (SudokuEx.Base = {}));
    var Base = SudokuEx.Base;
})(SudokuEx || (SudokuEx = {}));
var SudokuEx;
(function (SudokuEx) {
    (function (Base) {
        var BlockListInfo = (function () {
            function BlockListInfo(dimension) {
                var maxValue = dimension * dimension;
                this.blockCount = maxValue * 3;
                var blocks = new Array(this.blockCount);
                var cellsCount = maxValue * maxValue;
                var blockListHash = new Array(cellsCount);
                _.times(cellsCount, function (cellIndex) {
                    return blockListHash[cellIndex] = new Array();
                });

                var hashIndex = 0;

                _.times(maxValue, function (rowIndex) {
                    var rowArray = new Array(maxValue);
                    var colArray = new Array(maxValue);
                    var squareArray = new Array(maxValue);
                    var squareStartRow = Math.floor(rowIndex / dimension) * dimension;
                    var squareStartCol = rowIndex % dimension * dimension;
                    _.times(maxValue, function (colIndex) {
                        rowArray[colIndex] = SudokuEx.Base.SudokuUtils.getCellIndex(rowIndex, colIndex, maxValue);
                        colArray[colIndex] = SudokuEx.Base.SudokuUtils.getCellIndex(colIndex, rowIndex, maxValue);
                        squareArray[colIndex] = SudokuEx.Base.SudokuUtils.getCellIndex(squareStartRow + Math.floor(colIndex / dimension), squareStartCol + colIndex % dimension, maxValue);
                        var d = blockListHash[rowArray[colIndex]];

                        blockListHash[rowArray[colIndex]].push(rowArray);
                        blockListHash[colArray[colIndex]].push(colArray);
                        blockListHash[squareArray[colIndex]].push(squareArray);
                    });

                    blocks[rowIndex * 3] = rowArray;
                    blocks[rowIndex * 3 + 1] = colArray;
                    blocks[rowIndex * 3 + 2] = squareArray;
                });

                this.blockList = blocks;
                this.blockListHash = blockListHash;
            }
            BlockListInfo.prototype.getBlockCount = function () {
                return this.blockCount;
            };

            BlockListInfo.prototype.getBlockList = function () {
                return this.blockList;
            };

            BlockListInfo.prototype.getBlockListByCellID = function (cellID) {
                return this.blockListHash[cellID];
            };

            BlockListInfo.getInstance = function (dimension) {
                if (BlockListInfo.Instances[dimension]) {
                    return BlockListInfo.Instances[dimension];
                }

                BlockListInfo.Instances[dimension] = new BlockListInfo(dimension);
                return BlockListInfo.Instances[dimension];
            };
            BlockListInfo.MaxDimension = 5;
            BlockListInfo.Instances = new Array(BlockListInfo.MaxDimension);
            return BlockListInfo;
        })();
        Base.BlockListInfo = BlockListInfo;
    })(SudokuEx.Base || (SudokuEx.Base = {}));
    var Base = SudokuEx.Base;
})(SudokuEx || (SudokuEx = {}));
var SudokuEx;
(function (SudokuEx) {
    (function (Base) {
        var SudokuField = (function () {
            function SudokuField() {
            }
            SudokuField.prototype.setField = function (field) {
                var _this = this;
                this.cellsCount = field.length;
                this.notFilledCellsCount = this.cellsCount;
                this.maxValue = SudokuEx.Base.SudokuUtils.getMaxValueByCellsCount(this.cellsCount);
                this.dimension = SudokuEx.Base.SudokuUtils.getDimenensionByMaxValue(this.maxValue);

                this.blockListInfo = SudokuEx.Base.BlockListInfo.getInstance(this.dimension);

                this.field = new Array(this.cellsCount);
                _.times(this.cellsCount, function (cellID) {
                    return _this.field[cellID] = 0;
                }, this);
                _.times(this.cellsCount, function (cellID) {
                    return _this.setCellByID(cellID, field[cellID]);
                }, this);
            };

            SudokuField.prototype.getDimension = function () {
                return this.dimension;
            };

            SudokuField.prototype.getMaxValue = function () {
                return this.maxValue;
            };

            SudokuField.prototype.getCellsCount = function () {
                return this.cellsCount;
            };

            SudokuField.prototype.check = function () {
                return (this.notFilledCellsCount == 0) && this.checkBlocks();
            };

            SudokuField.prototype.setCell = function (rowIndex, colIndex, value) {
                this.setCellByID(SudokuEx.Base.SudokuUtils.getCellIndex(rowIndex, colIndex, this.maxValue), value);
            };

            SudokuField.prototype.setCellByID = function (cellID, value) {
                if (!this.checkCellValue(value))
                    throw "value must be non-negative and less or equal then dimension^2";
                if (this.field[cellID] == 0 && value != 0) {
                    this.notFilledCellsCount--;
                } else if (this.field[cellID] != 0 && value == 0) {
                    this.notFilledCellsCount++;
                }

                this.field[cellID] = value;
            };

            SudokuField.prototype.getCell = function (rowIndex, colIndex) {
                return this.getCellById(rowIndex * this.maxValue + colIndex);
            };

            SudokuField.prototype.getCellById = function (cellID) {
                return this.field[cellID];
            };

            SudokuField.prototype.getField = function () {
                return this.field.slice(0);
            };

            SudokuField.prototype.checkBlocks = function () {
                var _this = this;
                var field = this.field;
                return this.blockListInfo.getBlockList().every(function (block) {
                    var values = [];
                    return block.every(function (cellID) {
                        return SudokuEx.Base.SudokuUtils.tryAddUniqValue(values, _this.field[cellID]);
                    }, _this);
                }, this);
            };

            SudokuField.prototype.checkCellValue = function (value) {
                return value >= 0 && value <= this.maxValue;
            };

            SudokuField.prototype.copy = function () {
                var sudokuField = new SudokuField();
                sudokuField.notFilledCellsCount = this.notFilledCellsCount;
                sudokuField.cellsCount = this.cellsCount;
                sudokuField.maxValue = this.maxValue;
                sudokuField.dimension = this.dimension;
                sudokuField.blockListInfo = this.blockListInfo;
                sudokuField.field = this.getField();
                return sudokuField;
            };
            return SudokuField;
        })();
        Base.SudokuField = SudokuField;
    })(SudokuEx.Base || (SudokuEx.Base = {}));
    var Base = SudokuEx.Base;
})(SudokuEx || (SudokuEx = {}));
var SudokuEx;
(function (SudokuEx) {
    (function (Base) {
        var SudokuIndexUtils = (function () {
            function SudokuIndexUtils() {
            }
            SudokuIndexUtils.getColIndex = function (maxValue, index) {
                return index % maxValue;
            };

            SudokuIndexUtils.getRowIndex = function (maxValue, index) {
                return Math.floor(index / maxValue);
            };
            return SudokuIndexUtils;
        })();
        Base.SudokuIndexUtils = SudokuIndexUtils;
    })(SudokuEx.Base || (SudokuEx.Base = {}));
    var Base = SudokuEx.Base;
})(SudokuEx || (SudokuEx = {}));
var SudokuEx;
(function (SudokuEx) {
    (function (Base) {
        var SudokuSolverField = (function () {
            function SudokuSolverField() {
            }
            SudokuSolverField.prototype.setSudokuField = function (sudokuField) {
                this.sudokuField = sudokuField;
                this.allValueList = _.range(1, sudokuField.getMaxValue() + 1);
                this.blockListInfo = SudokuEx.Base.BlockListInfo.getInstance(this.sudokuField.getDimension());
            };

            SudokuSolverField.prototype.setCellValue = function (cellID, value) {
                this.sudokuField.setCellByID(cellID, value);
            };

            SudokuSolverField.prototype.getVariantListForCell = function (cellID) {
                var _this = this;
                var blockList = this.blockListInfo.getBlockListByCellID(cellID);
                var usedValues = [];
                _.each(blockList, function (block) {
                    _.each(block, function (cellID) {
                        return usedValues.push(_this.sudokuField.getCellById(cellID));
                    });
                }, this);
                return _.difference(this.allValueList, usedValues);
            };

            SudokuSolverField.prototype.getField = function () {
                return this.sudokuField.getField();
            };

            SudokuSolverField.prototype.getCellsCount = function () {
                return this.sudokuField.getCellsCount();
            };

            SudokuSolverField.prototype.getCellById = function (cellID) {
                return this.sudokuField.getCellById(cellID);
            };

            SudokuSolverField.prototype.check = function () {
                return this.sudokuField.check();
            };
            return SudokuSolverField;
        })();

        var SolverStatus;
        (function (SolverStatus) {
            SolverStatus[SolverStatus["modified"] = 0] = "modified";
            SolverStatus[SolverStatus["notModified"] = 1] = "notModified";
            SolverStatus[SolverStatus["invalid"] = 2] = "invalid";
            SolverStatus[SolverStatus["solved"] = 3] = "solved";
        })(SolverStatus || (SolverStatus = {}));
        ;

        var SudokuSolver = (function () {
            function SudokuSolver(field) {
                this.solutionList = [];
                this.history = [];
                var sudokuField = new SudokuEx.Base.SudokuField();
                sudokuField.setField(field);
                this.currentSudokuSolver = new SudokuSolverField();
                this.currentSudokuSolver.setSudokuField(sudokuField);
            }
            SudokuSolver.prototype.findSolution = function () {
                return this.findAllSolutions(1);
            };

            SudokuSolver.prototype.findAllSolutions = function (maxSolutionsCount) {
                if (typeof maxSolutionsCount === "undefined") { maxSolutionsCount = 0; }
                this.maxSolutionsCount = maxSolutionsCount;
                this.solutionList = [];
                this.trySolve();
                return (this.solutionList.length > 0);
            };

            SudokuSolver.prototype.getSolution = function () {
                if (this.solutionList.length > 0) {
                    return this.solutionList[0];
                }

                throw "Solution has not been found";
            };

            SudokuSolver.prototype.getSolutionsCount = function () {
                return this.solutionList.length;
            };

            SudokuSolver.prototype.getAllSolutions = function () {
                return this.solutionList;
            };

            SudokuSolver.prototype.trySolve = function () {
                var solverStatus = 0 /* modified */;
                while (solverStatus == 0 /* modified */) {
                    solverStatus = this.iterate();
                }

                if (solverStatus == 1 /* notModified */) {
                    if (this.currentSudokuSolver.check()) {
                        solverStatus = 3 /* solved */;
                    } else {
                        solverStatus = this.iterate(true);
                    }
                }

                if (solverStatus == 3 /* solved */) {
                    this.solutionList.push(this.currentSudokuSolver.getField());
                }

                return solverStatus;
            };

            SudokuSolver.prototype.iterate = function (goDeeper) {
                if (typeof goDeeper === "undefined") { goDeeper = false; }
                var solverStatus = 1 /* notModified */;
                var cellsCount = this.currentSudokuSolver.getCellsCount();

                for (var cellID = 0; cellID < cellsCount; cellID++) {
                    if (this.currentSudokuSolver.getCellById(cellID) == 0) {
                        solverStatus = this.processCell(cellID, goDeeper);
                        if (solverStatus == 3 /* solved */ || solverStatus == 2 /* invalid */) {
                            break;
                        }
                    }
                }

                return solverStatus;
            };

            SudokuSolver.prototype.processCell = function (cellID, goDeeper) {
                var solverStatus = 1 /* notModified */;
                var values = this.currentSudokuSolver.getVariantListForCell(cellID);
                if (values.length == 1) {
                    this.currentSudokuSolver.setCellValue(cellID, values[0]);
                    this.history.push(cellID);
                    solverStatus = 0 /* modified */;
                } else if (values.length == 0) {
                    solverStatus = 2 /* invalid */;
                } else if (goDeeper && values.length > 1) {
                    if (this.tryValues(cellID, values) == 3 /* solved */) {
                        solverStatus = 3 /* solved */;
                    } else {
                        solverStatus = 2 /* invalid */;
                    }
                }

                return solverStatus;
            };

            SudokuSolver.prototype.tryValues = function (cellID, values) {
                var _this = this;
                var solverStatus = 2 /* invalid */;
                var historyLength = this.history.length;

                values.some(function (value) {
                    _this.currentSudokuSolver.setCellValue(cellID, value);
                    _this.history.push(cellID);
                    if (cellID == 0) {
                        var i = 1;
                    }
                    solverStatus = _this.trySolve();
                    if (solverStatus == 3 /* solved */ && _this.maxSolutionsCount > 0 && _this.maxSolutionsCount == _this.solutionList.length) {
                        return true;
                    } else {
                        solverStatus = 2 /* invalid */;
                        while (_this.history.length > historyLength) {
                            _this.currentSudokuSolver.setCellValue(_this.history.pop(), 0);
                        }

                        return false;
                    }
                }, this);

                return solverStatus;
            };
            return SudokuSolver;
        })();
        Base.SudokuSolver = SudokuSolver;
    })(SudokuEx.Base || (SudokuEx.Base = {}));
    var Base = SudokuEx.Base;
})(SudokuEx || (SudokuEx = {}));
//# sourceMappingURL=sudokuEx.base.js.map
