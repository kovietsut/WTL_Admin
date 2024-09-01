export const convertTabValueToNumber = (tabValue: string | null | undefined) => {
  switch (tabValue) {
    case 'admin':
      return 1;
    case 'author':
      return 2;
    case 'reader':
      return 3;
    case 'translator':
      return 4;
    case 'all':
    default:
      return null;
  }
};

export const convertRoleNumberToRoleName = (roleId: number) => {
  switch (roleId) {
    case 1:
      return 'Admin';
    case 2:
      return 'Author';
    case 3:
      return 'Reader';
    case 4:
      return 'Translator';
    default:
      return undefined;
  }
};

export const arrayToString = (arr: number[]): string => {
  return arr.join(',');
};

export const isDarkImage = (imageSrc: string, callback: (isDark: boolean) => void) => {
  const img = new Image();
  img.src = imageSrc;
  img.crossOrigin = 'Anonymous';

  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    ctx.drawImage(img, 0, 0, img.width, img.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let colorSum = 0;

    for (let i = 0; i < imageData.data.length; i += 4) {
      const r = imageData.data[i];
      const g = imageData.data[i + 1];
      const b = imageData.data[i + 2];

      // Calculate brightness
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      colorSum += brightness;
    }

    const averageBrightness = colorSum / (img.width * img.height);

    // Consider image dark if average brightness is less than 128
    callback(averageBrightness < 128);
  };
};
