function Weapon(name, damage) {
    this.name = name;
    this.damage = damage;
}

// ���� ����
Weapon.weapons = {
    sword : new Weapon('Sword', 10),
    gun: new Weapon('Gun', 15)
};

module.exports = Weapon;