// // first attempt at pre-computing statistics with all possible filters
// // testing with 10 items, 54 max combinations, 9 actual results when we only consider
// // filter combinations that result in data

// type Data = {
//   ageRange: "under 10" | "10-17" | "18-24" | "25-34" | "over 34" | null;
//   gender: string | null;
//   datetime: string;
//   outcome: string | null;
//   type: "Person search" | "Vehicle search" | "Person and Vehicle search";
// };

// type Statistic = {
//   month: string;
//   ageRange: Data["ageRange"];
//   type: Data["type"];
//   totalSearches: number;
//   arrestCount: number;
// };

// const testData: Data[] = [
//   {
//     ageRange: "18-24",
//     gender: "Male",
//     datetime: "2025-06-05T14:30:00Z",
//     outcome: "Arrest",
//     type: "Person search",
//   },
//   {
//     ageRange: "18-24",
//     gender: "Female",
//     datetime: "2025-06-15T09:45:00Z",
//     outcome: "No further action",
//     type: "Vehicle search",
//   },
//   {
//     ageRange: "25-34",
//     gender: "Male",
//     datetime: "2025-06-20T17:10:00Z",
//     outcome: null,
//     type: "Vehicle search",
//   },
//   {
//     ageRange: "10-17",
//     gender: "Male",
//     datetime: "2025-07-01T11:20:00Z",
//     outcome: "Arrest",
//     type: "Person and Vehicle search",
//   },
//   {
//     ageRange: "over 34",
//     gender: "Female",
//     datetime: "2025-07-12T08:05:00Z",
//     outcome: "No further action",
//     type: "Person search",
//   },
//   {
//     ageRange: null,
//     gender: null,
//     datetime: "2025-08-03T13:00:00Z",
//     outcome: "Arrest",
//     type: "Person search",
//   },
//   {
//     ageRange: "18-24",
//     gender: "Male",
//     datetime: "2025-08-18T22:15:00Z",
//     outcome: null,
//     type: "Vehicle search",
//   },
//   {
//     ageRange: "under 10",
//     gender: "Unknown",
//     datetime: "2025-08-21T16:40:00Z",
//     outcome: "No further action",
//     type: "Person search",
//   },
//   {
//     ageRange: "25-34",
//     gender: "Female",
//     datetime: "2025-06-10T07:55:00Z",
//     outcome: "Arrest",
//     type: "Vehicle search",
//   },
//   {
//     ageRange: "over 34",
//     gender: "Male",
//     datetime: "2025-07-30T10:00:00Z",
//     outcome: null,
//     type: "Person and Vehicle search",
//   },
// ];

// const uniqueMonths = new Set<string>();
// const uniqueAgeGroups = new Set<Data["ageRange"]>();
// const uniqueTypes = new Set<Data["type"]>();

// for (const item of testData) {
//   const date = item.datetime.slice(0, 7);
//   console.log("date", date);
//   uniqueMonths.add(date);
//   uniqueAgeGroups.add(item.ageRange);
//   uniqueTypes.add(item.type);
// }

// console.log("unique months", uniqueMonths);
// console.log("unique age groups", uniqueAgeGroups);
// console.log("unique types", uniqueTypes);
// console.log(
//   "total num of combinations",
//   uniqueMonths.size * uniqueAgeGroups.size * uniqueTypes.size
// );

// const statistics: Statistic[] = [];

// for (const month of uniqueMonths) {
//   for (const ageGroup of uniqueAgeGroups) {
//     for (const type of uniqueTypes) {
//       // try to find an item in testData where the month, ageGroup and type are the same
//       let arrestCount = 0;

//       // todo: get rid of filter func
//       const matchedItems = testData.filter((item) => {
//         if (
//           item.datetime.includes(month) &&
//           item.ageRange === ageGroup &&
//           item.type === type
//         ) {
//           // would ideally do this in a separate loop? or make this the main loop and filter by pushing
//           if (item.outcome?.toLowerCase() === "arrest") {
//             arrestCount += 1;
//           }
//           return true;
//         }
//       });

//       if (matchedItems.length === 0) {
//         continue;
//       }

//       const statistic: Statistic = {
//         month: month,
//         ageRange: ageGroup,
//         type: type,
//         totalSearches: matchedItems.length,
//         arrestCount: arrestCount,
//       };

//       statistics.push(statistic);
//     }
//   }
// }

// console.log("statistics", statistics);
