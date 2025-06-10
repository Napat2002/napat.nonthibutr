
function minEnergy(start, shops, stations, target) {
  // ผมสามารถนั่งโดยสาร
  function isFree(a, b) {
    return stations.includes(a) && stations.includes(b);
  }

  // พลังงานที่ใช้จาก a ไป b
  function energy(a, b) {
    if (isFree(a, b)) {
      return 0; //เริ่ม
    }
    return Math.abs(a - b);
  }

  // ทุกวิธีที่เป็นไปได้
  function find(current, leftShops, usedEnergy) {
    // ถ้าแวะทุกร้าน
    if (leftShops.length === 0) {
      return usedEnergy + energy(current, target);
    }

    let min = Infinity;

    // เดินไปทุกร้านลำดับต่างๆ
    for (let i = 0; i < leftShops.length; i++) {
      const nextShop = leftShops[i]; // เดินต่อ
      const remaining = leftShops.filter((_, j) => j !== i); // ร้านที่ยังไปไม่ถึง

      const stepEnergy = energy(current, nextShop);
      const total = find(nextShop, remaining, usedEnergy + stepEnergy);

      // ถ้าเกิดว่าทางนี้ใช้พลังงานน้อยกว่าทางก่อนหน้า
      if (total < min) {
        min = total;
      }
    }

    return min;
  }

  // จุดเริ่มต้น
  return find(start, shops, 0);
}

const result = minEnergy(2, [4, 9], [3, 6, 8], 7);
console.log("พลังงานที่ใช้น้อยคือ:", result);
