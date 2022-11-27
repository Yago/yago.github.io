import type { NextApiRequest, NextApiResponse } from 'next';

import { getTree } from 'utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const tree = await getTree();
    res.status(200).json(tree);
  } else {
    res.status(405);
  }
}
