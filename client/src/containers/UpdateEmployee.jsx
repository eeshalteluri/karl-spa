import { useState, useEffect } from 'react'
import employeeSchema from '../Validation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { toast } from 'react-hot-toast'

import { useEmployees } from '../context/EmployeeProvider'
import codes from '../constants/CountryCodes'

const UpdateEmployee = ({closeModal, employeeData}) => {
    const { updateEmployee } = useEmployees()
    const [ isSubmitting, setIsSubmitting ] = useState(false)
    const { register, handleSubmit , setError, formState: { errors }} = useForm({resolver: zodResolver(employeeSchema)})

    const [employee, setEmployee] = useState({
        firstName: employeeData.firstName,
        lastName: employeeData.lastName,
        email: employeeData.email,
        countryCode: employeeData.countryCode,
        phone: employeeData.phone,
        company: employeeData.company,
        currency: employeeData.currency,
        salary: employeeData.salary
})

    useEffect(() => {
        document.body.style.overflow = 'hidden'

    return () => {
        document.body.style.overflow = 'scroll'
    }
    }, [])

    const handleChange = (e) => {
      const { name, value } = e.target;
      setEmployee(prev => ({
        ...prev,
        [name]: name === "salary" ? (value === "" ? null : Number(value)) : value,
      }));
    };


    const submitHandler = async (e) => {
        setIsSubmitting(true)
        
        try{
            console.log('updated employee data before sending: ', employee)
        toast.promise(updateEmployee(employeeData.id,employee), {
          loading: 'updating employee...',
          success: 'Employee updated successfully',
          error: 'Error updating employee'
      })

        console.log('submitted')
        console.log("Updated Employee added: ", employee)
        closeModal()

        }catch(error){
            console.log('Error adding employee:', error)
        }finally{
            setIsSubmitting(false)
        }
    }

    
  return (
    <div className='bg-white text-black py-6 rounded-md flex flex-col justify-center items-center h-fit max-w-2xl'>
      <h2 className='w-full text-3xl text-center pb-4 border-b m-4 font-bold'>Fill up the details below</h2>
  
      <form onSubmit={handleSubmit(submitHandler)} type="submit"  className='w-full [&>div]:mx-4'>
          <div>  
            <label htmlFor="email" className=''>Email address
              <input 
              type="email" 
              name="email" 
              id="email"
              {...register("email")}
              value={employee.email || ''}
              onChange={handleChange} 
              required 
              className='mb-4 block w-full px-3 py-2 border-b-2 border-primary text-gray-900 focus:bg-[#e8f0fe] focus:outline-none'/>
              {errors.email && <p className='text-red-500 mt-2'>{errors.email.message}</p>}
            </label>
          </div>
  
          <div className='flex flex-col md:flex-row md:items-center'>
            <label className='w-full md:w-1/2 md:mr-4' htmlFor="firstName">First Name
              <input 
              type="text" 
              name="firstName" 
              id="firstName"
              {...register("firstName")}  
              value={employee.firstName || ''}
              onChange={handleChange}
              required 
              className='mb-4 block w-full px-3 py-2 border-b-2 border-primary text-gray-900 focus:bg-[#e8f0fe] focus:outline-none'/>
              {errors.firstName && <p className='text-red-500 mt-2'>{errors.firstName.message}</p>}
            </label>
            <label className='w-full md:w-1/2' htmlFor="lastName">Last Name
              <input 
              type="text" 
              name="lastName" 
              id="lastName"
              {...register("lastName")}
              value={employee.lastName || ''} 
              onChange={handleChange}
              required 
              className='mb-4 block w-full px-3 py-2 border-b-2 border-primary text-gray-900 focus:bg-[#e8f0fe] focus:outline-none'/>
              {errors.lastName && <p className='text-red-500 mt-2'>{errors.lastName.message}</p>}
            </label>
          </div>
  
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
            {/* Country Selector */}
            <div className="w-full md:w-1/2 ">
              <label htmlFor="countryCode" className="block text-sm font-medium text-gray-700 mb-1">
                Select Country
              </label>
              <select
                id="countryCode"
                name="countryCode"
                {...register("countryCode")}
                value={employee.countryCode || ''}
                onChange={handleChange}
                required
                className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary"
              >
                {codes.map(({ country, isoCode3, countryCodes }) => (
                  <option key={isoCode3} value={countryCodes[0]}>
                    {country} (+{countryCodes[0]})
                  </option>
                ))}
              </select>
            </div>
  
            {/* Phone Number Input */}
            <div className="w-full md:w-1/2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                {...register("phone")}
                value={employee.phone || ''}
                onChange={handleChange}
                required
                className='mb-4 block w-full px-3 py-2 border-b-2 border-primary text-gray-900 focus:bg-[#e8f0fe] focus:outline-none'
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>
          </div>
  
          <div>
            <label htmlFor="company">Company
              <input 
              type='text' 
              name="company" 
              id="company"
              {...register("company")}
              value={employee.company || ''}
              onChange={handleChange}
              required 
              className='mb-4 block w-full px-3 py-2 border-b-2 border-primary text-gray-900 focus:bg-[#e8f0fe] focus:outline-none'/>
              {errors.company && <p className='text-red-500 mt-2'>{errors.company.message}</p>}
            </label>
          </div>
  
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
            {/* Country Selector */}
            <div className="w-full md:w-1/2 ">
              <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
                Select Currency
              </label>
              <select
                id="currency"
                name="currency"
                {...register("currency")}
                value={employee.currency || ''}
                onChange={handleChange}
                required
                className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary"
              >
                <option value="USD" label="US dollar">USD</option>
                <option value="CNY" label="Chinese yuan" selected={true}>CNY</option>
                <option value="EUR" label="Euro">EUR</option>
                <option value="JPY" label="Japanese yen">JPY</option>
                <option value="INR" label="Indian rupee">INR</option>
                <option value="GBP" label="Pound sterling">GBP</option>
                <option disabled>──────────</option>
                <option value="AFN" label="Afghan afghani">AFN</option>
                <option value="ALL" label="Albanian lek">ALL</option>
                <option value="AMD" label="Armenian dram">AMD</option>
                <option value="DZD" label="Algerian dinar">DZD</option>
                <option value="AOA" label="Angolan kwanza">AOA</option>
                <option value="ARS" label="Argentine peso">ARS</option>
                <option value="AUD" label="Australian dollar">AUD</option>
                <option value="AWG" label="Aruban florin">AWG</option>
                <option value="AZN" label="Azerbaijani manat">AZN</option>
                <option value="GBP" label="British pound">GBP</option>
                <option value="BAM" label="Bosnia and Herzegovina convertible mark">BAM</option>
                <option value="BBD" label="Barbadian dollar">BBD</option>
                <option value="BDT" label="Bangladeshi taka">BDT</option>
                <option value="BGN" label="Bulgarian lev">BGN</option>
                <option value="BHD" label="Bahraini dinar">BHD</option>
                <option value="BIF" label="Burundian franc">BIF</option>
                <option value="BMD" label="Bermudian dollar">BMD</option>
                <option value="BND" label="Brunei dollar">BND</option>
                <option value="BOB" label="Bolivian boliviano">BOB</option>
                <option value="BRL" label="Brazilian real">BRL</option>
                <option value="BSD" label="Bahamian dollar">BSD</option>
                <option value="BTN" label="Bhutanese ngultrum">BTN</option>
                <option value="BWP" label="Botswana pula">BWP</option>
                <option value="BYN" label="Belarusian ruble">BYN</option>
                <option value="BZD" label="Belize dollar">BZD</option>
                <option value="MMK" label="Burmese kyat">MMK</option>
                <option value="CAD" label="Canadian dollar">CAD</option>
                <option value="CDF" label="Congolese franc">CDF</option>
                <option value="XPF" label="CFP franc">XPF</option>
                <option value="CLP" label="Chilean peso">CLP</option>
                <option value="COP" label="Colombian peso">COP</option>
                <option value="CRC" label="Costa Rican colón">CRC</option>
                <option value="CUC" label="Cuban convertible peso">CUC</option>
                <option value="CUP" label="Cuban peso">CUP</option>
                <option value="CVE" label="Cape Verdean escudo">CVE</option>
                <option value="CZK" label="Czech koruna">CZK</option>
                <option value="HRK" label="Croatian kuna">HRK</option>
                <option value="XAF" label="Central African CFA franc">XAF</option>
                <option value="KHR" label="Cambodian riel">KHR</option>
                <option value="KYD" label="Cayman Islands dollar">KYD</option>
                <option value="KMF" label="Comorian franc">KMF</option>
                <option value="DJF" label="Djiboutian franc">DJF</option>
                <option value="DKK" label="Danish krone">DKK</option>
                <option value="DOP" label="Dominican peso">DOP</option>
                <option value="XCD" label="Eastern Caribbean dollar">XCD</option>
                <option value="EGP" label="Egyptian pound">EGP</option>
                <option value="ERN" label="Eritrean nakfa">ERN</option>
                <option value="ETB" label="Ethiopian birr">ETB</option>
                <option value="FJD" label="Fijian dollar">FJD</option>
                <option value="FKP" label="Falkland Islands pound">FKP</option>
                <option value="GEL" label="Georgian lari">GEL</option>
                <option value="GGP" label="Guernsey pound">GGP</option>
                <option value="GHS" label="Ghanaian cedi">GHS</option>
                <option value="GIP" label="Gibraltar pound">GIP</option>
                <option value="GMD" label="Gambian dalasi">GMD</option>
                <option value="GNF" label="Guinean franc">GNF</option>
                <option value="GTQ" label="Guatemalan quetzal">GTQ</option>
                <option value="GYD" label="Guyanese dollar">GYD</option>
                <option value="HKD" label="Hong Kong dollar">HKD</option>
                <option value="HNL" label="Honduran lempira">HNL</option>
                <option value="HTG" label="Haitian gourde">HTG</option>
                <option value="HUF" label="Hungarian forint">HUF</option>
                <option value="IDR" label="Indonesian rupiah">IDR</option>
                <option value="ILS" label="Israeli new shekel">ILS</option>
                <option value="IQD" label="Iraqi dinar">IQD</option>
                <option value="IRR" label="Iranian rial">IRR</option>
                <option value="ISK" label="Icelandic króna">ISK</option>
                <option value="JEP" label="Jersey pound">JEP</option>
                <option value="JMD" label="Jamaican dollar">JMD</option>
                <option value="JOD" label="Jordanian dinar">JOD</option>
                <option value="JPY" label="Japanese yen">JPY</option>
                <option value="KES" label="Kenyan shilling">KES</option>
                <option value="KGS" label="Kyrgyzstani som">KGS</option>
                <option value="KID" label="Kiribati dollar">KID</option>
                <option value="KWD" label="Kuwaiti dinar">KWD</option>
                <option value="KZT" label="Kazakhstani tenge">KZT</option>
                <option value="LAK" label="Lao kip">LAK</option>
                <option value="LBP" label="Lebanese pound">LBP</option>
                <option value="LRD" label="Liberian dollar">LRD</option>
                <option value="LSL" label="Lesotho loti">LSL</option>
                <option value="LYD" label="Libyan dinar">LYD</option>
                <option value="MAD" label="Moroccan dirham">MAD</option>
                <option value="MDL" label="Moldovan leu">MDL</option>
                <option value="MGA" label="Malagasy ariary">MGA</option>
                <option value="MKD" label="Macedonian denar">MKD</option>
                <option value="IMP" label="Manx pound">IMP</option>
                <option value="MNT" label="Mongolian tögrög">MNT</option>
                <option value="MOP" label="Macanese pataca">MOP</option>
                <option value="MRU" label="Mauritanian ouguiya">MRU</option>
                <option value="MUR" label="Mauritian rupee">MUR</option>
                <option value="MVR" label="Maldivian rufiyaa">MVR</option>
                <option value="MWK" label="Malawian kwacha">MWK</option>
                <option value="MXN" label="Mexican peso">MXN</option>
                <option value="MYR" label="Malaysian ringgit">MYR</option>
                <option value="MZN" label="Mozambican metical">MZN</option>
                <option value="KPW" label="North Korean won">KPW</option>
                <option value="TWD" label="New Taiwan dollar">TWD</option>
                <option value="NAD" label="Namibian dollar">NAD</option>
                <option value="ANG" label="Netherlands Antillean guilder">ANG</option>
                <option value="NGN" label="Nigerian naira">NGN</option>
                <option value="NIO" label="Nicaraguan córdoba">NIO</option>
                <option value="NOK" label="Norwegian krone">NOK</option>
                <option value="NPR" label="Nepalese rupee">NPR</option>
                <option value="NZD" label="New Zealand dollar">NZD</option>
                <option value="OMR" label="Omani rial">OMR</option>
                <option value="PAB" label="Panamanian balboa">PAB</option>
                <option value="PEN" label="Peruvian sol">PEN</option>
                <option value="PGK" label="Papua New Guinean kina">PGK</option>
                <option value="PHP" label="Philippine peso">PHP</option>
                <option value="PKR" label="Pakistani rupee">PKR</option>
                <option value="PLN" label="Polish złoty">PLN</option>
                <option value="PYG" label="Paraguayan guaraní">PYG</option>
                <option value="QAR" label="Qatari riyal">QAR</option>
                <option value="RON" label="Romanian leu">RON</option>
                <option value="RUB" label="Russian ruble">RUB</option>
                <option value="RWF" label="Rwandan franc">RWF</option>
                <option value="WST" label="Samoan tālā">WST</option>
                <option value="ZAR" label="South African rand">ZAR</option>
                <option value="LKR" label="Sri Lankan rupee">LKR</option>
                <option value="RSD" label="Serbian dinar">RSD</option>
                <option value="KRW" label="South Korean won">KRW</option>
                <option value="SAR" label="Saudi riyal">SAR</option>
                <option value="CHF" label="Swiss franc">CHF</option>
                <option value="SEK" label="Swedish krona">SEK</option>
                <option value="SGD" label="Singapore dollar">SGD</option>
                <option value="SHP" label="Saint Helena pound">SHP</option>
                <option value="SLL" label="Sierra Leonean leone">SLL</option>
                <option value="SLS" label="Somaliland shilling">SLS</option>
                <option value="SOS" label="Somali shilling">SOS</option>
                <option value="SRD" label="Surinamese dollar">SRD</option>
                <option value="SSP" label="South Sudanese pound">SSP</option>
                <option value="STN" label="São Tomé and Príncipe dobra">STN</option>
                <option value="SYP" label="Syrian pound">SYP</option>
                <option value="SZL" label="Swazi lilangeni">SZL</option>
                <option value="THB" label="Thai baht">THB</option>
                <option value="PRB" label="Transnistrian ruble">PRB</option>
                <option value="TJS" label="Tajikistani somoni">TJS</option>
                <option value="TMT" label="Turkmenistan manat">TMT</option>
                <option value="TND" label="Tunisian dinar">TND</option>
                <option value="TOP" label="Tongan paʻanga">TOP</option>
                <option value="TRY" label="Turkish lira">TRY</option>
                <option value="TTD" label="Trinidad and Tobago dollar">TTD</option>
                <option value="TVD" label="Tuvaluan dollar">TVD</option>
                <option value="TZS" label="Tanzanian shilling">TZS</option>
                <option value="UAH" label="Ukrainian hryvnia">UAH</option>
                <option value="UGX" label="Ugandan shilling">UGX</option>
                <option value="USD" label="United States dollar">USD</option>
                <option value="UYU" label="Uruguayan peso">UYU</option>
                <option value="UZS" label="Uzbekistani soʻm">UZS</option>
                <option value="AED" label="United Arab Emirates dirham">AED</option>
                <option value="VES" label="Venezuelan bolívar soberano">VES</option>
                <option value="VND" label="Vietnamese đồng">VND</option>
                <option value="VUV" label="Vanuatu vatu">VUV</option>
                <option value="XOF" label="West African CFA franc">XOF</option>
                <option value="ZMW" label="Zambian kwacha">ZMW</option>
                <option value="ZWB" label="Zimbabwean bonds">ZWB</option>
              </select>
              {errors.currency && <p className='text-red-500 mt-2'>{errors.salary.message}</p>}
            </div>
            
            <label htmlFor="salary" className="w-full md:w-1/2">Salary
              <input 
              type='number' 
              name="salary" 
              id="salary"
              {...register("salary")}
              value={employee.salary || null}
              onChange={handleChange} 
              required 
              className='block w-full px-3 py-2 border-b-2 border-primary text-gray-900 focus:bg-[#e8f0fe] focus:outline-none'/>
              {errors.salary && <p className='text-red-500 mt-2'>{errors.salary.message}</p>}
            </label>
          </div>
  
          <div className='flex justify-end'>
          <button type='button' onClick={ closeModal } className={isSubmitting ? 'font-bold text-[#ef4444] p-2 rounded mt-4 mr-2 cursor-not-allowed': 'font-bold text-[#ef4444] p-2 rounded mt-4 mr-2'}>CLOSE</button>
          <button 
          type='submit' 
          className={isSubmitting? 'border py-2 px-6 rounded mt-4 bg-primary text-white font-bold cursor-not-allowed': 'border py-2 px-6 rounded mt-4 bg-primary text-white font-bold'}>{ isSubmitting? 'Saving...' : 'SAVE CHANGES'}</button>
          </div>
      </form>
    </div>
  )
}

export default UpdateEmployee