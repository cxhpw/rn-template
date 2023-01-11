const a = ['a', 'b', 'c'] as const;

type B = typeof a[number];

const v = new Set(['1', '2', '3'] as const);

type V = Parameters<typeof v.add>[number];

const vv: V = '1';

console.log(vv);
