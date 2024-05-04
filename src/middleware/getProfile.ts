import { Request, Response, NextFunction } from 'express'

const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    const { Profile } = req.app.get('models')
    const profileId = req.headers["profile_id"];
    const profile = await Profile.findByPk(profileId);

    if (!profile) return res.status(401).json({ message: "Unauthorized" });
    req.profile = profile
    next();
}

export default getProfile;