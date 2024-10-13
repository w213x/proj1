const connectWalletButton = document.getElementById('connectWallet');
const walletAddressElement = document.getElementById('walletAddress').querySelector('span');
const balanceElement = document.getElementById('balance').querySelector('span');

// Проверяем, установлен ли MetaMask
if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
} else {
    alert('Please install MetaMask to use this dApp!');
}

// Подключение кошелька
connectWalletButton.addEventListener('click', async () => {
    try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        walletAddressElement.textContent = account;

        // Получение баланса
        const balance = await ethereum.request({
            method: 'eth_getBalance',
            params: [account, 'latest']
        });

        // Переводим баланс из Wei в ETH
        const ethBalance = window.web3.utils.fromWei(balance, 'ether');
        balanceElement.textContent = ethBalance;

    } catch (error) {
        console.error('Error connecting to wallet:', error);
    }
});
