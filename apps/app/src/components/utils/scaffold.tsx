import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@playbook/ui";

export const Scaffold = ({ data }: { data: Array<any> }) => {
  if (data.length === 0) {
    return <>No data</>;
  }

  return (
    <div className="border border-input rounded-md">
      <Table>
        <TableHeader className="bg-gray-50 font-medium">
          <TableRow>
            {Object.entries(data[0]).map((key, i) => {
              return <TableHead key={i}>{`${[key[0]]}`}</TableHead>;
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((todo) => (
            <TableRow key={todo.uuid}>
              {Object.entries(todo).map((key, i) => {
                if (typeof key[1] === "boolean") {
                  const val = key[1];
                  return (
                    <TableCell key={i}>
                      <Checkbox checked={val} />
                    </TableCell>
                  );
                }
                return <TableCell key={i}>{`${todo[key[0]]}`}</TableCell>;
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
