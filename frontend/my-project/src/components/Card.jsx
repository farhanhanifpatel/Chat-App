import PropTypes from 'prop-types'

export const Card = ({ children, className }) => {
    return <div className={`bg-white shadow-lg rounded-lg p-4 ${className}`}>{children}</div>
}

Card.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
}

Card.defaultProps = {
    className: '',
}

export const CardHeader = ({ children, className }) => {
    return <div className={`border-b pb-4 mb-4 ${className}`}>{children}</div>
}

CardHeader.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
}

CardHeader.defaultProps = {
    className: '',
}

export const CardTitle = ({ children, className }) => {
    return <h2 className={`text-xl font-semibold ${className}`}>{children}</h2>
}

CardTitle.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
}

CardTitle.defaultProps = {
    className: '',
}

export const CardDescription = ({ children, className }) => {
    return <p className={`text-gray-500 ${className}`}>{children}</p>
}

CardDescription.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
}

CardDescription.defaultProps = {
    className: '',
}

export const CardContent = ({ children, className }) => {
    return <div className={`py-4 ${className}`}>{children}</div>
}

CardContent.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
}

CardContent.defaultProps = {
    className: '',
}

export default Card
