/**
 * TypeScript 内置了多种泛型工具类型：
    工具类型	描述	示例
    Partial<T>	使所有属性变为可选	Partial<{ id: number }> → { id?: number }
    Required<T>	使所有属性变为必填	Required<{ id?: number }> → { id: number }
    Readonly<T>	使所有属性变为只读	Readonly<{ id: number }> → { readonly id: number }
    Pick<T, K>	从 T 中选取一组属性 K	Pick<{ id: number, name: string }, 'id'> → { id: number }
    Omit<T, K>	从 T 中排除一组属性 K	Omit<{ id: number, name: string }, 'id'> → { name: string }
    Record<K, T>	创建键为 K 类型，值为 T 类型的对象	`Record<'a'	'b', number>→{ a: number, b: number }`
    ReturnType<T>	获取函数返回值类型	ReturnType<() => string> → string
 */

// 创建一个类型，将 T 中 K 属性变为可选
type MakeOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

interface User {
   id: number;
   name: string;
   email: string;
}


type UserInfo = MakeOptional<User, 'email'>;
const userInfo: UserInfo = {
   id: 1,
   name: '张三',
   email: '<EMAIL>',
}