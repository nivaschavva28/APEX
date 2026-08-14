import { CodeSnippet } from '../types';

export const SAMPLE_SNIPPETS: CodeSnippet[] = [
  {
    id: 'calculate-average',
    name: 'Calculate Average (Array Out-of-Bounds)',
    fileName: 'main.js',
    language: 'JavaScript',
    description: 'Classic off-by-one boundary bug causing NaN in average calculation',
    defaultErrorLine: 8,
    tags: ['JavaScript', 'Array', 'Off-by-one'],
    code: `function calculateAverage(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    return 0;
  }

  let sum = 0;
  for (let i = 0; i <= numbers.length; i++) {
    sum += numbers[i];
  }

  return sum / numbers.length;
}

console.log(calculateAverage([10, 20, 30]));`
  },
  {
    id: 'react-user-data',
    name: 'React Hook Data Fetching',
    fileName: 'useUserData.ts',
    language: 'TypeScript',
    description: 'React hook error handling and missing dependency in useEffect',
    defaultErrorLine: 12,
    tags: ['React', 'TypeScript', 'Hooks'],
    code: `import { useState, useEffect } from 'react';

export const useUserData = (userId: string) => {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(\`/api/users/\${userId}\`);
        const data = await res.json();
        setUser(data);
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchData();
  }, []); // Bug: missing userId in dependency array

  return { user, error };
};`
  },
  {
    id: 'async-race-condition',
    name: 'Async State Mutation Bug',
    fileName: 'paymentProcessor.js',
    language: 'JavaScript',
    description: 'Direct state mutation in async loop with unhandled rejection',
    defaultErrorLine: 9,
    tags: ['Async', 'JavaScript', 'State'],
    code: `async function processTransactions(transactions, account) {
  let finalBalance = account.balance;

  transactions.forEach(async (tx) => {
    if (tx.type === 'DEBIT') {
      finalBalance -= tx.amount; // Race condition: forEach does not await async callback
    } else {
      finalBalance += tx.amount;
    }
  });

  return finalBalance;
}

console.log(processTransactions([{ type: 'DEBIT', amount: 50 }], { balance: 100 }));`
  },
  {
    id: 'python-dict-key',
    name: 'Python Key Missing Check',
    fileName: 'analytics.py',
    language: 'Python',
    description: 'KeyError exception risk when parsing nested analytics payload',
    defaultErrorLine: 5,
    tags: ['Python', 'Dictionary', 'KeyError'],
    code: `def get_user_region(payload):
    # Unsafe nested dictionary access
    user_data = payload["data"]["user"]
    region_code = user_data["geo"]["region"]
    return region_code.upper()

sample = {"data": {"user": {"name": "Alice"}}}
print(get_user_region(sample))`
  }
];
