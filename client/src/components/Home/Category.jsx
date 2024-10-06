import { Button, Table, TableHead, TableRow, TableCell, TableBody, styled } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';

import { categories } from '../../constants/data';

const StyledTable = styled(Table)`
    border: 1px solid rgba(224, 224, 224, 1);
`;
    
const StyledButton = styled(Button)`
    margin: 20px;
    width: 85%;
    background: #6495ED;
    color: #fff;
    text-decoration: none;
`;
    
const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;
const Categories = () =>{
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    

    return (
        <>
         <Link to={`/create?category=${category || ''}`} style={{ textDecoration: 'none' }}>
                <StyledButton variant="contained">Create Blog</StyledButton>
            </Link>
        <styledTable>
            <TableHead>
                <TableRow>
                    <TableCell>
                        All Categerious
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                { Categories.map(Category =>(
                    <TableRow key={Category.id}>
                        <TableCell>
                            <StyledLink to={`/?category=${Category.type}`}>
                            {Category.type}
                            </StyledLink>
                            </TableCell>
                            </TableRow>
                ))
            }

            </TableBody>
        </styledTable>
        </>
    )
}
export default Categories;