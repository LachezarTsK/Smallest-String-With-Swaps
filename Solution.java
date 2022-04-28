
import java.util.Collections;
import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.LinkedList;
import java.util.stream.IntStream;

public class Solution {

    private Map<Integer, LinkedList<Character>> groups;
    private int inputSize;

    public String smallestStringWithSwaps(String input, List<List<Integer>> pairs) {
        inputSize = input.length();
        groups = new HashMap<>();
        UnionFind unionFind = new UnionFind(inputSize);

        joinDirectPairs(unionFind, pairs);
        joinIndirectPairs(unionFind, input);

        return createSmallestStringWithSwaps(unionFind);
    }

    private String createSmallestStringWithSwaps(UnionFind unionFind) {
        char[] result = new char[inputSize];
        for (int key : groups.keySet()) {
            Collections.sort(groups.get(key));
        }
        for (int i = 0; i < inputSize; ++i) {
            result[i] = groups.get(unionFind.parent[i]).pollFirst();
        }
        return String.valueOf(result);
    }

    private void joinDirectPairs(UnionFind unionFind, List<List<Integer>> pairs) {
        for (List<Integer> p : pairs) {
            int parentFirst = unionFind.findParent(p.get(0));
            int parentSecond = unionFind.findParent(p.get(1));
            unionFind.joinByRank(parentFirst, parentSecond);
        }
    }

    private void joinIndirectPairs(UnionFind unionFind, String input) {
        for (int i = 0; i < inputSize; ++i) {
            unionFind.parent[i] = unionFind.findParent(unionFind.parent[i]);
            groups.computeIfAbsent(unionFind.parent[i], group -> new LinkedList<>()).add(input.charAt(i));
        }
    }
}

class UnionFind {

    protected int[] parent;
    protected int[] rank;

    UnionFind(int inputSize) {
        rank = new int[inputSize];
        parent = IntStream.range(0, inputSize).toArray();
    }

    protected int findParent(int index) {
        if (parent[index] != index) {
            parent[index] = findParent(parent[index]);
        }
        return parent[index];
    }

    protected void joinByRank(int first, int second) {
        if (rank[first] > rank[second]) {
            parent[second] = parent[first];
        } else if (rank[first] < rank[second]) {
            parent[first] = parent[second];
        } else {
            parent[second] = parent[first];
            rank[first]++;
        }
    }
}
