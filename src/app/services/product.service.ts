import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private create = `${environment.api}/product/create`;
  private edit = `${environment.api}/product/edit`;
  private get_products = `${environment.api}/product/get_products`;
  private get_product_by_id = `${environment.api}/product/get_product_by_id`;
  private accessToken = localStorage.getItem('accessToken');
  private serverKey = environment.server_key;
  private cart: any[] = [];
  private baseUrl = 'https://afrozikbox.com/endpoint/product';
  private cartItemCountSource = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCountSource.asObservable();

  constructor(private http: HttpClient) {}

  // Create product
  createProduct(productData: any): Observable<any> {
    const formData = new FormData();

    // Append fields from productData to FormData
    formData.append('title', productData.title);
    formData.append('desc', productData.desc);
    formData.append('tags', productData.tags);
    formData.append('price', productData.price);
    formData.append('units', productData.units);
    formData.append('related', productData.related);
    formData.append('category', productData.category);
    formData.append('server_key', this.serverKey);
    formData.append('access_token', this.accessToken || '');

    // Vérifier si "images" existe et ajouter les images au FormData
    if (productData.images && productData.images.length > 0) {
      for (let i = 0; i < productData.images.length; i++) {
        formData.append(
          'image[]',
          productData.images[i],
          productData.images[i].name
        );
      }
    }

    return this.http.post<any>(this.create, formData, {
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    });
  }

  updateCartCount(count: number) {
    this.cartItemCountSource.next(count);
  }

  // Edit product (similar to create but with 'id' field included)
  editProduct(productData: any): Observable<any> {
    const formData = new FormData();

    formData.append('id', productData.id);
    formData.append('title', productData.title);
    formData.append('desc', productData.desc);
    formData.append('tags', productData.tags);
    formData.append('price', productData.price);
    formData.append('units', productData.units);
    formData.append('related', productData.related);
    formData.append('category', productData.category);
    formData.append('server_key', this.serverKey);
    formData.append('access_token', this.accessToken || '');

    for (let i = 0; i < productData.images.length; i++) {
      formData.append(
        'image[]',
        productData.images[i],
        productData.images[i].name
      );
    }

    return this.http.post<any>(this.edit, formData, {
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    });
  }

  /**
   * Récupère les produits avec des filtres optionnels via HttpParams.
   * @param offset - ID pour paginer les produits (optionnel).
   * @param priceFrom - Prix minimum (optionnel).
   * @param priceTo - Prix maximum (optionnel).
   * @param categories - Liste des catégories (optionnel).
   * @returns Observable avec les produits filtrés.
   */
  getProducts(
    offset?: number,
    priceFrom: number = 1,
    priceTo: number = 10000,
    categories: string[] = []
  ): Observable<any> {
    if (!this.serverKey) {
      console.error('Clé serveur manquante.');
      return throwError('Erreur : Clé serveur manquante.');
    }

    if (!Array.isArray(categories)) {
      console.error('Les catégories doivent être un tableau.');
      return throwError('Erreur : Les catégories doivent être un tableau.');
    }

    // Construire les paramètres pour la requête
    let params = new HttpParams()
      .set('price_from', priceFrom.toString())
      .set('price_to', priceTo.toString())
      .set('category', categories.join(','))
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken || '');

    if (offset !== undefined) {
      params = params.set('offset', offset.toString());
    }

    console.log('Paramètres envoyés :', params.toString());

    // Effectuer la requête avec les paramètres
    return this.http.get(this.get_products, { params }).pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération des produits :', error);
        return throwError(
          'Impossible de récupérer les produits. Veuillez réessayer.'
        );
      })
    );
  }

  /**
   * Récupère un produit par son ID.
   * @param productId - ID du produit.
   * @returns Observable avec le produit spécifique.
   */
  getProductById(productId: any): Observable<any> {
    const endpoint = this.get_product_by_id;
    let params = new HttpParams()
      .set('product_id', productId.toString())
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken || '');

    return this.http.post(endpoint, params);
  }

  clearCart(): void {
    this.cart = [];
    console.log('Panier vidé.');
  }

  addToCart(productId: number): Observable<any> {
    let params = new HttpParams()
      .set('product_id', productId.toString())
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken || '');
    return this.http.post(`${this.baseUrl}/add_cart`, params).pipe(
      catchError((error) => {
        console.error('Add to cart error:', error);
        return throwError(() => error);
      })
    );
    this.getCartItems().subscribe((response) => {
      this.updateCartCount(response.data.length);
    });
  }

  removeFromCart(productId: number): Observable<any> {
    let params = new HttpParams()
      .set('product_id', productId.toString())
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken || '');
    return this.http.post(`${this.baseUrl}/remove_cart`, params).pipe(
      catchError((error) => {
        console.error('Remove from cart error:', error);
        return throwError(() => error);
      })
    );
  }

  getCartItems(): Observable<any> {
    let params = new HttpParams()
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken || '');
    return this.http.post(`${this.baseUrl}/get_cart`, params).pipe(
      catchError((error) => {
        console.error('Get cart error:', error);
        return throwError(() => error);
      })
    );
  }
}
