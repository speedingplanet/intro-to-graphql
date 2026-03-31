import allData from '../data/all-data.json' with { type: 'json' };
import { resolvers as labResolvers } from '../labs/lab-resolvers.js';
import { mergeResolvers } from '@graphql-tools/merge';

let {
	countries,
	studentData: {
		classes,
		courses,
		departments,
		instructors,
		registrations,
		rooms,
		students_nested: students,
	},
} = allData;

const mainResolvers = {
	Query: {
		greetings() {
			return 'Hello and well met!';
		},

		// hello: (parent, { name }: { name: string }) => `Hello ${name ?? 'everyone'}!`,

		// All of these are equivalent (assignment, declaration, arrow)
		// hello: function () { return 'Hi!'; },
		// hello() { return 'Hi!'; },
		// hello: () => 'Hi!',
		hello(parent, args) {
			let firstName = args.firstName ?? 'everyone';
			return `Hi ${firstName} ${args.lastName ?? ''}!`;
		},

		countries() {
			return countries;
		},

		/*
		 * For any resolver, the signature is
		 * resolver(parent, arguments, context, info)
		 *
		 * parent: The previous resolver in the resolver chain
		 * arguments: All GraphQL arguments provided to this resolver
		 * context: Shared across all resolvers for this operation; use to share state
		 * info: Metadata about the operation's execution state (field name, path to field, etc.)
		 * info also allows reading/setting/overriding cache control hints.
		 * See:https://www.apollographql.com/docs/apollo-server/performance/caching#in-your-resolvers-dynamic
		 *
		 */
		countryByName(parent, { name }, context) {
			context.operationName = 'countryByName';
			context.accessCount = 1;
			if (!name) return countries;

			return [countries.find((c) => c.country === name)];
		},

		students(parent, { country }) {
			// students(parent, params) {
			if (!country) return students;

			return students.filter((s) => s.address.country === country);
		},

		classes() {
			return classes;
		},

		courses() {
			return courses;
		},

		departments() {
			return departments;
		},

		instructors() {
			return instructors;
		},

		registrations() {
			return registrations;
		},

		rooms() {
			return rooms;
		},

		studentsByCountry(parent, { country }) {
			// Have to return null, not undefined
			return students.filter((s) => s.address.country === country) ?? null;
		},
		/*
		studentsWithFilter(parent, args) {
			// Shortcut, no need to do filtering work if args is not present or empty
			if (!args || _.isEmpty(args)) return students;

			let filteredStudents: Student[] = [...students];
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
			filteredStudents = _.filter(students, args.filter) as Student[];
			return filteredStudents;
		},

		studentsWithFields(parent, args) {
			// studentsWithFields(province: 'CA', country: 'US')
			// Shortcut, no need to do filtering work if args is not present or empty
			if (!args || _.isEmpty(args)) return students;
			let passedArgs = { filter: { ...args } };
			return this.studentsWithFilter(null, passedArgs);
		},

		studentById(parent, { id }) {
			// Have to return null, not undefined
			return students.find((s) => s.id === id) ?? null;
		},
		*/
	},

	Country: {
		pop2026(parent, args, context) {
			console.log(`pop2026 resolver, context is ${context.operationName}`);
			context.accessCount++;
			console.log(context);
			return parent.pop2026;
		},
		country(parent, args, context) {
			console.log(`country resolver, context is ${context.operationName}`);
			context.accessCount++;
			console.log(context);
			return parent.country;
		},
		rank(parent, args, context) {
			console.log(`rank resolver, context is ${context.operationName}`);
			context.accessCount++;
			console.log(context);
			return parent.rank;
		},
	},

	Course: {
		department(parent) {
			return departments.find((d) => d.id === parent.departmentId) || null;
		},
	},

	Class: {
		course(parent) {
			return courses.find((course) => course.id === parent.courseId) || null;
		},
		instructor(parent) {
			return instructors.find((i) => i.id === parent.instructorId) || null;
		},
		room(parent) {
			return rooms.find((i) => i.id === parent.roomId) || null;
		},
	},

	Instructor: {
		department(parent) {
			return departments.find((d) => d.id === parent.departmentId) || null;
		},
		classes(parent) {
			return classes.filter((c) => c.instructorId === parent.id) || null;
		},
	},

	Registration: {
		class(parent) {
			return classes.find((c) => c.id === parent.classId) || null;
		},
		student(parent) {
			// return students.find((s) => s.id === parent.studentId) || null;
			let { firstName, lastName } = students.find((s) => s.id === parent.studentId) || null;
			return `${firstName} ${lastName}`;
		},
		course(parent) {
			let foundClass = classes.find((c) => c.id === parent.classId);
			return courses.find((course) => course.id === foundClass?.courseId) || null;
		},
	},

	// Mutation: {
	/*
		addStudent(parent, args) {
			let id = getNextId(students, 'id');
			let newStudent: Student = {
				...args.student,
				id,
			};

			students.push(newStudent);

			return newStudent;
		},

		updateStudent(parent, args) {
			let id = args.id;

			let foundStudent = students.find((s) => s.id === id);
			if (foundStudent === undefined) {
				throw new GraphQLError(`Invalid argument value (id ${id} not found`, {
					extensions: { code: 'BAD_USER_INPUT' },
				});
			}

			Object.assign(foundStudent, args.student);
			return foundStudent;
		},

		deleteStudent(parent, args) {
			let id = args.id;

			let foundStudentIndex = students.findIndex((m) => m.id === id);
			if (foundStudentIndex === -1) {
				throw new GraphQLError(`Invalid argument value (id ${id} not found`, {
					extensions: { code: 'BAD_USER_INPUT' },
				});
			} else {
				students.splice(foundStudentIndex, 1);
			}
			return true;
		},
		*/
	// },
};

export const resolvers = mergeResolvers([mainResolvers, labResolvers]);
