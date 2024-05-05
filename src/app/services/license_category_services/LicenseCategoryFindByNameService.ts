import { licenseCategoryRepository } from '../../../infra/db/sequelize/repositories/licenseCategoryRepository';

class LicenseCategoryFindByNameService {    
    async findByName(name: string) {
        const licenseCategory = await licenseCategoryRepository.findByName(name);
        return licenseCategory
    }
}

const licenseCategoryFindByNameService = new LicenseCategoryFindByNameService();

export { licenseCategoryFindByNameService };