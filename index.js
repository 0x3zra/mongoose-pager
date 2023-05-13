const paginate = (schema) => {
	schema.statics.paginate = async function (options, populate = '', query = {}) {
		const { sortBy = 'createdAt', sortDirection = 'desc', page = 1, limit = 25 } = options;
		const skip = (page - 1) * limit;

		let docsQuery = this.find(query)
			.sort({ [sortBy]: sortDirection })
			.skip(skip)
			.limit(limit);
		if (populate) {
			populate.split(' ').forEach((path) => {
				docsQuery = docsQuery.populate(
					path
						.split('.')
						.reverse()
						.reduce((a, b) => ({ path: b, populate: a }))
				);
			});
		}
		const totalResultsPromise = this.countDocuments(query).exec();
		const resultsPromise = docsQuery.lean().exec();
		const [totalResults, rawResults] = await Promise.all([totalResultsPromise, resultsPromise]);
		const results = rawResults.map((doc) => {
			delete doc.activePaths;
			delete doc.skipId;
			return doc;
		});
		return {
			results,
			totalResults,
			page,
			limit: Math.min(limit, totalResults),
			lastPage: Math.ceil(totalResults / limit)
		};
	};
};

module.exports = paginate;
