import { NextApiRequest, NextApiResponse } from 'next';

const users = (request: NextApiRequest, response: NextApiResponse) => {
    const user = [
        {id: 1, name: 'Rafael'}
    ]

    return response.json(user)
}

export default users;