import { query as q } from 'faunadb';

import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import { fauna } from '../../../services/fauna';

export default NextAuth({
    providers: [
        Providers.GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            scope: 'read:user'
        }),
        // ...add more providers here
    ],
    callbacks: {
        async session(session) {
            try {
                const userActiveSubscription = await fauna.query(
                    q.Get(
                        q.Intersection([
                            q.Match(
                                q.Index('subscription_by_user_ref'),
                                q.Select(
                                    "ref",
                                    q.Get(
                                        q.Match(
                                            q.Index('user_by_email'),
                                            q.Casefold(session.user.email)
                                        )
                                    )
                                )
                            ),
                            q.Match(
                                q.Index('subscription_by_stats'),
                                "active"
                            )
                        ])
                    )
                )

                return {
                    ...session,
                    activeSubscription: userActiveSubscription,
                };
            } catch (err) {
                return {
                    ...session,
                    activeSubscription: true
                }
            }
        },
        async signIn(user, account, profile) {
            const { email } = user;

            try {
                await fauna.query(
                    q.If(
                        q.Not(
                            q.Exists(
                                q.Match( // where
                                    q.Index('user_by_email'),
                                    q.Casefold(email)
                                )
                            )
                        ),
                        q.Create(
                            q.Collection('users'),
                            {data: { email }}
                        ),
                        q.Get( // select
                            q.Match( // where
                                q.Index('user_by_email'),
                                q.Casefold(email)
                            )
                        )
                    )
                )

                return true;
            }catch {
                return false;
            }
        }
    }

    // A database is optional, but required to persist accounts in a database
    // database: process.env.DATABASE_URL,
})