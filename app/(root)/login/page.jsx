export default async function Login() {
    return(
        <div>
            <input type="text" placeholder="email" className="border-2 border-gray-300 rounded-md p-2 m-2" />
            <input type="password" placeholder="password" className="border-2 border-gray-300 rounded-md p-2 m-2" />
            <button className="bg-blue-500 text-white rounded-md p-2 m-2">Login</button>
        </div>
    )
}