import { NextApiRequest, NextApiResponse } from "next";

const Webhooks = (req: NextApiRequest, res: NextApiResponse) => {
    console.log('evento recebido');

    res.status(200).json({
        ok: true
    })
}

export default Webhooks;