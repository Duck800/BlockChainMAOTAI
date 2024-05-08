import CryptoJS from 'crypto-js';

export class Block {
  constructor(index, timestamp, data, previousHash) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    const data = this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash;
    const hash = CryptoJS.SHA256(data).toString();
    return hash;
  }
}

export class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    const productId = this.calculateHash(0, new Date().toISOString(), 'Genesis Block', '0');
    return new Block(0, new Date().toISOString(), {
      productId,
      producer: '',
      location: '',
      responsiblePerson: '',
      carrier: {
        origin: '无',
        destination: '无',
        transporter: '无'
      }
    }, '0');
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  updateBlockData(index, newData) {
    if (index >= 0 && index < this.chain.length) {
      this.chain[index].data = newData;
    }
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }

  calculateHash(index, timestamp, data, previousHash) {
    const dataToHash = index + timestamp + JSON.stringify(data) + previousHash;
    const hash = CryptoJS.SHA256(dataToHash).toString();
    return hash;
  }
}