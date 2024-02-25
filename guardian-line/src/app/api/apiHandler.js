import nextConnect from 'next-connect';

const apiHandler = nextConnect({
  onError: (error, req, res) => {
    console.error('Error handling request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default apiHandler;

