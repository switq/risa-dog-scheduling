export function onChangeMoney(valor) {
    let preco = valor ? parseFloat(valor).to : 0;
    if (preco === 0) return;

    preco = parseFloat(`${valor}`.replace('.', ''));
    preco /= 100;

    return preco;
}