import allData from '../data/all-data.json' with { type: 'json' };

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

export const resolvers = {
	Query: {
		// hello: (parent, { name }: { name: string }) => `Hello ${name ?? 'everyone'}!`,

		// All of these are equivalent (assignment, declaration, arrow)
		// hello: function () { return 'Hi!'; },
		// hello() { return 'Hi!'; },
		// hello: () => 'Hi!',
		hello(parent, args) {
			let firstName = args.firstName ?? 'everyone';
			return `Hi ${firstName}!`;
		},

		countries() {
			return countries;
		},

		countryByName(parent, { name }) {
			if (!name) return countries;

			return countries.find((c) => c.name === name);
		},

		students(parent, { country }) {
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
			return students.find((s) => s.id === parent.studentId) || null;
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
