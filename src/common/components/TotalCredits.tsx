import { Card, Typography } from "@material-tailwind/react";
 
const TABLE_HEAD = ["Name", "Job"];
 
const TABLE_ROWS = [
  {
    name: "John Michael",
    job: "Manager"
  },
  {
    name: "Alexa Liras",
    job: "Developer"
  },
  {
    name: "Laurent Perrier",
    job: "Executive"
  },
  {
    name: "Michael Levi",
    job: "Developer"
  },
  {
    name: "Richard Gran",
    job: "Manager"
  },
];
 
export function DefaultTable() {
  return (
    <Card className="h-full w-full overflow-scroll" >
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"                 >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map(({ name, job}, index) => {
            const isLast = index === TABLE_ROWS.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
            return (
              <tr key={name}>
                <td className={classes}>
                  <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal" children={undefined} placeholder={undefined}                  >
                    {name}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal" children={undefined} placeholder={undefined}                  >
                    {job}
                  </Typography>
                </td>
                
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}