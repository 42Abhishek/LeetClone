// {
//   "title": "Sum of Two Numbers",
//   "description": "Given two integers A and B, print their sum.",
//   "difficulty" : "easy",
//   "tags": "math",
//   "visibleTestCases": [
//     {
//       "input": "10 20",
//       "output": "30",
//       "explanation" : "10 + 20 equals 30"
//     },
//     {
//       "input": "-5 8",
//       "output": "3",
//       "explanation" : "-5 + 8 equals 3"
//     }
//   ],
//   "hiddenTestCases": [
//     {
//       "input": "100 200",
//       "output": "300"
//     },
//     {
//       "input": "-50 8",
//       "output": "-42"
//     }
//   ],
//   "startCode": [
//     {
//       "language": "c++",
//     "initialCode": "int sum(int a, int b) {\n    // Write your code here\n}"
//     },
//     {
//       "language": "javascript",
//       "initialCode": "function sum(a, b) {\n    // Write your code here\n}"
//     },
//     {
//       "language": "java",
//       "initialCode": "public static int sum(int a, int b) {\n    // Write your code here\n}"
//     }
//   ],
//   "referenceSolution": [
//     {
//       "language": "C++",
//       "completeCode": "#include<iostream>\nusing namespace std;\nint main() {\n    int a, b;\n    cin >> a >> b;\n    cout << a + b << endl;\n    return 0;\n}"
//     },

//     {
//       "language": "javascript",
//       "completeCode": "const readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout });\nrl.on('line', (line) => {\n  const [a, b] = line.trim().split(' ').map(Number);\n  console.log(a + b);\n  rl.close();\n});"
//     },
//     {
//       "language": "java",
//       "completeCode": "import java.util.*;\npublic class Main {\n  public static void main(String[] args) {\n    Scanner sc = new Scanner(System.in);\n    int a = sc.nextInt();\n    int b = sc.nextInt();\n    System.out.println(a + b);\n  }\n}"
//     }
//   ]
// }

{
  

//     _id: '507f1f77bcf86cd799439011',
//     title: 'Two Sum',
//     description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

// You may assume that each input would have exactly one solution, and you may not use the same element twice.

// You can return the answer in any order.

// Example 1:
// Input: nums = [2,7,11,15], target = 9
// Output: [0,1]
// Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

// Example 2:
// Input: nums = [3,2,4], target = 6
// Output: [1,2]

// Example 3:
// Input: nums = [3,3], target = 6
// Output: [0,1]

// Constraints:
// - 2 <= nums.length <= 10^4
// - -10^9 <= nums[i] <= 10^9
// - -10^9 <= target <= 10^9
// - Only one valid answer exists.`,
//     difficulty: 'easy',
//     tags: 'array',
//     visibleTestCases: [
//       {
//         input: 'nums = [2,7,11,15], target = 9',
//         output: '[0,1]',
//         explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
//       },
//       {
//         input: 'nums = [3,2,4], target = 6',
//         output: '[1,2]',
//         explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].'
//       }
//     ],
//     startCode: [
//       {
//         language: 'javascript',
//         initialCode: `/**
//  * @param {number[]} nums
//  * @param {number} target
//  * @return {number[]}
//  */
// var twoSum = function(nums, target) {
    
// };`
//       },
//       {
//         language: 'java',
//         initialCode: `class Solution {
//     public int[] twoSum(int[] nums, int target) {
        
//     }
// }`
//       },
//       {
//         language: 'cpp',
//         initialCode: `class Solution {
// public:
//     vector<int> twoSum(vector<int>& nums, int target) {
        
//     }
// };`
//       }
//     ],
//     editorial: {
//       content: `## Approach 1: Brute Force

// The brute force approach is simple. Loop through each element x and find if there is another value that equals to target - x.

// **Algorithm:**
// 1. For each element in the array
// 2. Check if target - current element exists in the rest of the array
// 3. If found, return the indices

// **Complexity Analysis:**
// - Time complexity: O(n²)
// - Space complexity: O(1)

// ## Approach 2: Hash Table

// To improve our runtime complexity, we need a more efficient way to check if the complement exists in the array. If the complement exists, we need to get its index. What is the best way to maintain a mapping of each element in the array to its index? A hash table.

// **Algorithm:**
// 1. Create a hash table to store elements and their indices
// 2. For each element, calculate complement = target - current element
// 3. If complement exists in hash table, return indices
// 4. Otherwise, add current element to hash table

// **Complexity Analysis:**
// - Time complexity: O(n)
// - Space complexity: O(n)`
//     },
//     solutions: [
//       {
//         language: 'javascript',
//         title: 'Hash Table Approach',
//         code: `var twoSum = function(nums, target) {
//     const map = new Map();
    
//     for (let i = 0; i < nums.length; i++) {
//         const complement = target - nums[i];
        
//         if (map.has(complement)) {
//             return [map.get(complement), i];
//         }
        
//         map.set(nums[i], i);
//     }
    
//     return [];
// };`
//       },
//       {
//         language: 'java',
//         title: 'Hash Table Approach',
//         code: `class Solution {
//     public int[] twoSum(int[] nums, int target) {
//         Map<Integer, Integer> map = new HashMap<>();
        
//         for (int i = 0; i < nums.length; i++) {
//             int complement = target - nums[i];
            
//             if (map.containsKey(complement)) {
//                 return new int[] { map.get(complement), i };
//             }
            
//             map.put(nums[i], i);
//         }
        
//         return new int[0];
//     }
// }`
//       }
//     ]
//   };
}




