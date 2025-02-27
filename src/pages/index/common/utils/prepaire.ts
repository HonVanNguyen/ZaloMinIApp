export const prepareDynamicData = (formData) => {
    const updatedData = { ...formData };
  
    Object.keys(formData).forEach((key) => {
      if (key.endsWith("_custom")) {
        const originalKey = key.replace("_custom", ""); // Lấy key gốc
        updatedData[originalKey] = formData[key]; // Ghi đè giá trị tùy chỉnh
        delete updatedData[key]; // Xóa key_custom sau khi ghi đè
      }
    });
  
    return updatedData;
  };