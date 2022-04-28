
/**
 * @param {string} input
 * @param {number[][]} pairs
 * @return {string}
 */
var smallestStringWithSwaps = function (input, pairs) {
    this.inputSize = input.length;
    this.groups = new Map();
    const unionFind = new UnionFind(this.inputSize);

    joinDirectPairs(unionFind, pairs);
    joinIndirectPairs(unionFind, input);

    return createSmallestStringWithSwaps(unionFind);
};

/**
 * @param {UnionFind} unionFind
 * @return {string}
 */
function createSmallestStringWithSwaps(unionFind) {
    const result = new Array(this.inputSize);
    for (let key of this.groups.keys()) {
        this.groups.get(key).sort((x, y) => y.localeCompare(x));
    }
    for (let i = 0; i < inputSize; ++i) {
        result[i] = this.groups.get(unionFind.parent[i]).pop();
    }
    return result.join('');
}

/**
 * @param {UnionFind} unionFind
 * @param {number[][]} pairs
 * @return {void}
 */
function joinDirectPairs(unionFind, pairs) {
    for (let p of pairs) {
        let parentFirst = unionFind.findParent(p[0]);
        let parentSecond = unionFind.findParent(p[1]);
        unionFind.joinByRank(parentFirst, parentSecond);
    }
}

/**
 * @param {UnionFind} unionFind
 * @param {string} input
 * @return {void}
 */
function joinIndirectPairs(unionFind, input) {
    for (let i = 0; i < this.inputSize; ++i) {
        unionFind.parent[i] = unionFind.findParent(unionFind.parent[i]);
        if (!this.groups.has(unionFind.parent[i])) {
            this.groups.set(unionFind.parent[i], []);
        }
        this.groups.get(unionFind.parent[i]).push(input.charAt(i));
    }
}

class UnionFind {

    constructor(inputSize) {
        this.rank = new Array(inputSize);
        this.parent = Array.from(Array(inputSize).keys());
    }

    findParent(index) {
        if (this.parent[index] !== index) {
            this.parent[index] = this.findParent(this.parent[index]);
        }
        return this.parent[index];
    }

    joinByRank(first, second) {
        if (this.rank[first] > this.rank[second]) {
            this.parent[second] = this.parent[first];
        } else if (this.rank[first] < this.rank[second]) {
            this.parent[first] = this.parent[second];
        } else {
            this.parent[second] = this.parent[first];
            this.rank[first]++;
        }
    }
}
