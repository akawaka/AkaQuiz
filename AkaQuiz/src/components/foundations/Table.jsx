import PropTypes from 'prop-types';
import BodyText from './BodyText';

export const Table = ({ headers, rows }) => {
  return (
    <div>
      <BodyText variant="paragraph">
        Voila le classement super
      </BodyText>
      <table className="min-w-full mt-10 bg-white border shadow-md border-slate-200">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left bg-indigo-300 border-b border-slate-200">
              Position
            </th>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-4 py-2 text-left bg-indigo-300 border-b border-slate-200"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className="px-4 py-2 border-b border-slate-200">
                {rowIndex + 1}
              </td>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-2 border-b border-slate-200">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))).isRequired,
};

export default Table;
