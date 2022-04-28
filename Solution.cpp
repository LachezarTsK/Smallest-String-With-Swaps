
#include <algorithm>
#include <numeric>
#include <vector>
using namespace std;

class UnionFind {
    
public:
    vector<int> parent;
    vector<int> rank;

    UnionFind(int inputSize) {
        rank.resize(inputSize);
        parent.resize(inputSize);
        iota(parent.begin(), parent.end(), 0);
    }

    int findParent(int index) {
        if (parent[index] != index) {
            parent[index] = findParent(parent[index]);
        }
        return parent[index];
    }

    void joinByRank(int first, int second) {
        if (rank[first] > rank[second]) {
            parent[second] = parent[first];
        } else if (rank[first] < rank[second]) {
            parent[first] = parent[second];
        } else {
            parent[second] = parent[first];
            rank[first]++;
        }
    }
};

class Solution {
    
    unordered_map<int, vector<char>> groups;
    size_t inputSize;

public:
    string smallestStringWithSwaps(const string& input, const vector<vector<int>>& pairs) {
        inputSize = input.size();
        UnionFind unionFind(inputSize);

        joinDirectPairs(unionFind, pairs);
        joinIndirectPairs(unionFind, input);

        return createSmallestStringWithSwaps(unionFind);
    }

private:
    string createSmallestStringWithSwaps(UnionFind& unionFind) {
        string result;
        for (auto& g : groups) {
            sort(g.second.begin(), g.second.end(), [](char first, char second) {
                return first > second; });
        }
        for (int i = 0; i < inputSize; ++i) {
            result.push_back(groups[unionFind.parent[i]].back());
            groups[unionFind.parent[i]].pop_back();
        }
        return result;
    }

    void joinDirectPairs(UnionFind& unionFind, const vector<vector<int>>&pairs) {
        for (const auto& p : pairs) {
            int parentFirst = unionFind.findParent(p[0]);
            int parentSecond = unionFind.findParent(p[1]);
            unionFind.joinByRank(parentFirst, parentSecond);
        }
    }

    void joinIndirectPairs(UnionFind& unionFind, const string& input) {
        for (int i = 0; i < inputSize; ++i) {
            unionFind.parent[i] = unionFind.findParent(unionFind.parent[i]);
            groups[unionFind.parent[i]].push_back(input[i]);
        }
    }
};
