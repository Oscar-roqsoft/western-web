export const compressImage = (
    file,
    maxWidth = 1200,
    quality = 0.8
  ) => {
    return new Promise((resolve, reject) => {
  
      if (!(file instanceof File)) {
        return reject(new Error("Invalid file"));
      }
  
      // Don't compress PDFs
      if (file.type === "application/pdf") {
        return resolve(file);
      }
  
      const reader = new FileReader();
  
      reader.onload = (event) => {
  
        const img = new Image();
  
        img.onload = () => {
  
          let width = img.width;
          let height = img.height;
  
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
  
          const canvas = document.createElement("canvas");
  
          canvas.width = width;
          canvas.height = height;
  
          const ctx = canvas.getContext("2d");
  
          ctx.drawImage(img, 0, 0, width, height);
  
          canvas.toBlob(
            (blob) => {
  
              if (!blob) {
                return reject(new Error("Compression failed"));
              }
  
              const compressed = new File(
                [blob],
                file.name,
                {
                  type: "image/jpeg",
                  lastModified: Date.now(),
                }
              );
  
              resolve(compressed);
  
            },
            "image/jpeg",
            quality
          );
  
        };
  
        img.onerror = reject;
  
        img.src = event.target.result;
  
      };
  
      reader.onerror = reject;
  
      reader.readAsDataURL(file);
  
    });
  };