module.exports = {
    generateGrid: (sizeX, sizeY, mineCount) => { return generateGrid(sizeX, sizeY, mineCount) },
    printGrid: (grid) => { return printGrid(grid) }
}


function generateGrid(sizeX = 6, sizeY = 6, mineCount = 12) {

    let grid = [];
    let mines = [];
    if (mineCount > sizeX * sizeY - 1) {
        throw ("Error: Too many mines for grid size!"); // Checks for mine count
    }

    // Generate mines
    for (let i = 0; i < mineCount; i++) {
        let candidate = [Math.floor(Math.random() * sizeY), Math.floor(Math.random() * sizeX)]
        if (!includesArray(mines, candidate)) {
            mines.push(candidate);
        } else {
            i--;
        }
    }

    // Generate grid
    for (let i = 0; i < sizeY; i++) {
        let temp = []
        for (let j = 0; j < sizeX; j++) {
            temp.push(0);
        }
        grid.push(temp);
    }

    // Add mines to grid
    for (let i = 0; i < mines.length; i++) {
        grid[mines[i][0]][mines[i][1]] = -1;
    }

    // Add numbering
    for (let i = 0; i < sizeX; i++) {
        for (let j = 0; j < sizeY; j++) {
            for (let u = 0; u < 3; u++) {
                for (let v = 0; v < 3; v++) {
                    try { // This is very dirty and i hate myself for it
                        if (grid[i][j] != -1) {
                            if (grid[i + (u - 1)][j + (v - 1)] < 0) {
                                grid[i][j]++
                            }
                        }
                    } catch (e) { } // Do i have the willpower to improve this? Absolutely not.
                }
            }
        }
    }
    return (grid);
}



function printGrid(grid) {
    let output = ['\n'];

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            let candidate = grid[i][j].toString();
            if (candidate == '-1') {
                output.push(' ' + candidate);
            } else {
                output.push('  ' + candidate);
            }
        }
        output.push('\n');
    }
    console.log(output);
}

function includesArray(base, includes) {
    for (let i = 0; i < base.length; i++) {
        if (compareArrays(base[i], includes)) {
            return true;
        }
    }
    return false;
}

function compareArrays(array1, array2) {
    if (array1.length != array2.length) {
        return false;
    }
    for (let i = 0; i < array1.length; i++) {
        if (array1[i] != array2[i]) {
            return false;
        }
    }
    return true;
}