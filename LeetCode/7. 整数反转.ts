function reverse(x: number): number {
    const abs = Math.abs(x);
    const str = String(abs).split('').reverse().join('');
    const res = Number(str) * (x < 0 ? -1 : 1);
    if (res < Math.pow(-2, 31) || res > (Math.pow(2, 31) - 1)) {
        return 0;
    }
    return res;
};