import { serialize } from 'cookie';

export default async function handler(req, res) {
  try {
    res.setHeader(
      'Set-Cookie',
      serialize('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        'Max-Age': 0, // Set Max-Age to zero to remove the cookie
      })
    );

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
